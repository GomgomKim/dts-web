import { forwardRef, useCallback, useEffect, useState } from 'react'

import { relight } from '@/views/canvas/lib/editColorService'
import { useSkinGlowStore } from '@/views/canvas/model/useEditorPanelsStore'

import { throttle } from 'lodash'

interface SkinGlowViewProps {
  imgUrl: string
  modelMat: cv.Mat | null
  normalMat: cv.Mat | null
  maskMat: cv.Mat | null
  setModelMat: (mat: cv.Mat) => void
  setSkinGlowMat: (mat: cv.Mat) => void
}

export const SkinGlowView = forwardRef<HTMLCanvasElement, SkinGlowViewProps>(
  (props, ref) => {
    const skinGlowSize = useSkinGlowStore((state) => state.skinGlowSize)
    const skinGlowPower = useSkinGlowStore((state) => state.skinGlowPower)

    const [specularPower, setSpecularPower] = useState<number>(120)
    const [specularHighlightsStrength, setSpecularHighlightsStrength] =
      useState<number>(0.01)

    const [canvas, setCanvas] = useState<HTMLCanvasElement | null>(null)
    const [isDragging, setIsDragging] = useState(false)
    const [lightPos, setLightPos] = useState<{ x: number; y: number }>({
      x: 50,
      y: 50
    })

    const ambientLight = 1
    const normalDiffuseStrength = 0
    const totalGain = 1
    const inputType = 'euler'

    const relightImage = useCallback(
      (x?: number, y?: number) => {
        let clonedModelMat: cv.Mat | null = null
        let clonedNormalMat: cv.Mat | null = null
        try {
          if (!canvas || !props.modelMat || !props.normalMat) return

          if (props.modelMat.empty() || props.normalMat.empty()) {
            console.log('Mat 객체가 비어있거나 유효하지 않음')
            return
          }

          const { yaw, pitch } = computeLightAngles(
            x ? x : lightPos.x,
            y ? y : lightPos.y,
            canvas.width,
            canvas.height
          )

          clonedModelMat = props.modelMat.clone()
          clonedNormalMat = props.normalMat.clone()

          const resultBase64 = relight(
            clonedModelMat,
            props.maskMat,
            clonedNormalMat,
            yaw,
            pitch,
            specularPower,
            ambientLight,
            normalDiffuseStrength,
            specularHighlightsStrength,
            totalGain,
            inputType
          )

          clonedModelMat.delete()
          clonedNormalMat.delete()

          const img = new Image()
          img.onload = () => {
            try {
              const ctx = canvas.getContext('2d')
              if (!ctx) return
              ctx.clearRect(0, 0, canvas.width, canvas.height)
              ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
              const updatedMat = window.cv.imread(canvas)
              if (props.modelMat) {
                props.modelMat.delete()
              }
              props.setModelMat(updatedMat)
            } catch (error) {
              // TODO error 처리
            }
          }
          img.src = resultBase64 as string
        } catch (error) {
          // TODO error 처리
        }
      },
      [
        canvas,
        props.modelMat,
        props.normalMat,
        props.maskMat,
        lightPos,
        ambientLight,
        normalDiffuseStrength,
        totalGain,
        specularPower,
        specularHighlightsStrength
      ]
    )

    const throttledRelightImage = useCallback(
      throttle((x: number, y: number) => {
        relightImage(x, y)
      }, 200),
      [relightImage]
    )

    useEffect(() => {
      relightImage()
    }, [specularPower, specularHighlightsStrength])

    useEffect(() => {
      // skinGlowSize 0~100 -> specularPower 100~70
      const newSpecularPower = Math.round(-0.3 * skinGlowSize + 100)
      setSpecularPower(newSpecularPower)
    }, [skinGlowSize])

    useEffect(() => {
      // skinGlowPower 0~100 -> specularHighlightsStrength 0.1~0.5
      const newSpecularHighlightsStrength =
        Math.round((0.004 * skinGlowPower + 0.1) * 1000) / 1000
      setSpecularHighlightsStrength(newSpecularHighlightsStrength)
    }, [skinGlowPower])

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

    useEffect(() => {
      const canvasElement = (ref as React.RefObject<HTMLCanvasElement>).current
      if (canvasElement) {
        setCanvas(canvasElement)
      }
    }, [ref])

    const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
      const rect = canvas?.getBoundingClientRect()
      if (!rect) return

      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      // 커서 근처에서 클릭했을 때만 드래그 시작
      const dx = x - lightPos.x
      const dy = y - lightPos.y
      const distance = Math.sqrt(dx * dx + dy * dy)

      if (distance < 40) {
        // 커서 크기(40px) 내에서 클릭 시
        setIsDragging(true)
      }
    }

    const handleMouseUp = () => {
      setIsDragging(false)
    }

    const handleMouseLeave = () => {
      setIsDragging(false)
    }

    const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
      if (!canvas || !props.modelMat || !props.normalMat) return

      const rect = canvas.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      // 드래그 중일 때만 커서 이동 및 효과 적용
      if (isDragging) {
        setLightPos({ x, y })
        throttledRelightImage(x, y)
      }
    }

    return (
      <div className="relative size-full">
        <canvas
          ref={ref}
          className="size-full"
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
          onMouseMove={handleMouseMove}
          style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
        />
        {/* 빛나는 커서 */}
        <div
          style={{
            position: 'absolute',
            top: lightPos.y - 20,
            left: lightPos.x - 20,
            width: 40,
            height: 40,
            borderRadius: '50%',
            pointerEvents: 'none',
            // 더 밝고 강한 빛 효과
            boxShadow: `0 0 ${skinGlowSize}px ${skinGlowSize / 1.5}px rgba(255, 255, 255, 0.5), 
                       0 4px 40px rgba(255, 255, 255, 0.8)`,
            background: isDragging
              ? 'radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(255,255,255,0.9) 50%, rgba(255,255,255,0) 100%)'
              : 'radial-gradient(circle, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.8) 50%, rgba(255,255,255,0) 100%)',
            border: '4px solid #FFF'
          }}
        />
      </div>
    )
  }
)

SkinGlowView.displayName = 'SkinGlowView'
