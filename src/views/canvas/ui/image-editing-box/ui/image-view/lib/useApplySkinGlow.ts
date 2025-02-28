import { useCallback, useEffect } from 'react'

import { relight } from '@/views/canvas/lib/editColorService'
import { useSkinGlowStore } from '@/views/canvas/model/useEditorPanelsStore'

import { throttle } from 'lodash'

import { useLayersStore } from './useLayersStore'

interface UseApplySkinGlowProps {
  modelMat: cv.Mat | null
  normalMat: cv.Mat | null
  maskMat: cv.Mat | null
  canvas: HTMLCanvasElement | null
}

export const useApplySkinGlow = (props: UseApplySkinGlowProps) => {
  const setSkinGlowLayer = useLayersStore((state) => state.setSkinGlowLayer)
  const skinGlowSize = useSkinGlowStore((state) => state.skinGlowSize)
  const skinGlowPower = useSkinGlowStore((state) => state.skinGlowPower)
  const ambientLight = 1
  const normalDiffuseStrength = 0
  const totalGain = 1
  const inputType = 'euler'
  const THROTTLE_DELAY = 200

  const applySkinGlow = useCallback(
    (x: number, y: number) => {
      try {
        if (!props.canvas || !props.modelMat || !props.normalMat) return

        if (props.modelMat.empty() || props.normalMat.empty()) {
          console.log('Mat 객체가 비어있거나 유효하지 않음')
          return
        }

        const { yaw, pitch } = computeLightAngles(
          x,
          y,
          props.canvas.width,
          props.canvas.height
        )

        const resultBase64 = relight(
          props.modelMat,
          props.maskMat,
          props.normalMat,
          yaw,
          pitch,
          getSpecularPower(),
          ambientLight,
          normalDiffuseStrength,
          getSpecularHighlightsStrength(),
          totalGain,
          inputType
        )

        setSkinGlowLayer(resultBase64)
        return resultBase64
        // console.log('resultBase64', resultBase64)
      } catch (error) {
        // TODO: error 처리
      }
    },
    [
      props.canvas,
      props.modelMat,
      props.normalMat,
      props.maskMat,
      ambientLight,
      normalDiffuseStrength,
      totalGain,
      skinGlowSize,
      skinGlowPower
    ]
  )

  const throttledSkinGlow = useCallback(
    throttle((x: number, y: number) => {
      return applySkinGlow(x, y)
    }, THROTTLE_DELAY),
    [applySkinGlow]
  )

  // 컴포넌트 언마운트 시 throttle 취소
  useEffect(() => {
    return () => {
      throttledSkinGlow.cancel()
    }
  }, [throttledSkinGlow])

  // skinGlowSize 0~100 -> specularPower 100~20
  const getSpecularPower = () => {
    return Math.round(-0.8 * skinGlowSize + 100)
  }

  // skinGlowPower 0~100 -> specularHighlightsStrength 0.1~0.5
  const getSpecularHighlightsStrength = () => {
    return Math.round((0.004 * skinGlowPower + 0.1) * 1000) / 1000
  }

  /**
   * 캔버스 중앙을 기준으로 마우스 위치를 정규화하여 lightYaw, lightPitch 값을 계산
   * - yaw: 좌우 방향, pitch: 상하 방향 (상단이 양수)
   */
  const computeLightAngles = (
    x: number,
    y: number,
    canvasWidth: number,
    canvasHeight: number
  ): { yaw: number; pitch: number } => {
    const centerX = canvasWidth / 2
    const centerY = canvasHeight / 2
    const dx = (x - centerX) / centerX // [-1, 1]
    const dy = (centerY - y) / centerY // 상단: 양수, 하단: 음수
    const yaw = dx * 180 // 범위: -180 ~ 180
    const pitch = dy * 90 // 범위: -90 ~ 90
    return { yaw, pitch }
  }

  return { applySkinGlow, throttledSkinGlow }
}
