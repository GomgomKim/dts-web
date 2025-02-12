import { useCallback } from 'react'

import { applyMultiplyAndFeather } from '@/views/canvas/lib/editColorService'
import { useColorBrushStore } from '@/views/canvas/model/useEditorPanelsStore'
import {
  MAX_CUSTOM_BRUSHES,
  createCustomBrush
} from '@/views/canvas/ui/editor-panels/color-brush/model'

interface UseApplyColorProps {
  canvasRef: React.RefObject<HTMLCanvasElement>
  modelMat: cv.Mat | null
  maskMatRef: React.RefObject<cv.Mat>
  setModelMat: (val: cv.Mat) => void
  setShowHighlight: (val: boolean) => void
  currentBrushSegment: number | null
  setCurrentBrushSegment: (val: number | null) => void
}

export const useApplyColor = (props: UseApplyColorProps) => {
  const selectedColorBrushItem = useColorBrushStore(
    (state) => state.selectedColorBrushItem
  )
  const customBrushes = useColorBrushStore((state) => state.customBrushes)
  const addCustomBrush = useColorBrushStore((state) => state.addCustomBrush)
  const setSelectedColorBrushItem = useColorBrushStore(
    (state) => state.setSelectedColorBrushItem
  )
  const colorBrushSmoothEdges = useColorBrushStore(
    (state) => state.colorBrushSmoothEdges
  )
  const colorBrushOpacity = useColorBrushStore(
    (state) => state.colorBrushOpacity
  )
  const colorBrushColor = useColorBrushStore((state) => state.colorBrushColor)

  const applyColor = useCallback(
    (isHairColor?: boolean) => {
      if (!props.modelMat || !props.maskMatRef.current) return null

      // hair 모드일 경우, 고정 segment 목록
      // 아닐 경우, 현재 선택된 브러시 세그먼트 목록 or 신규 브러시 segment
      const segmentsToColor =
        selectedColorBrushItem?.segments ??
        (props.currentBrushSegment ? [props.currentBrushSegment] : null)

      if (!segmentsToColor) return null

      // 새로 그린 브러시가 아직 등록되지 않았다면 새로 등록
      if (
        props.currentBrushSegment &&
        !selectedColorBrushItem &&
        customBrushes.length < MAX_CUSTOM_BRUSHES
      ) {
        const newBrush = createCustomBrush(customBrushes.length + 1)
        addCustomBrush(newBrush)
        setSelectedColorBrushItem(newBrush)
        props.setCurrentBrushSegment(null)
      }

      const base64 = applyMultiplyAndFeather(
        props.modelMat,
        props.maskMatRef.current,
        converFeatherRange(colorBrushSmoothEdges),
        colorBrushOpacity,
        colorBrushColor,
        isHairColor ? 'type3' : 'type1'
      )

      const mainCanvas = props.canvasRef.current
      if (!mainCanvas) return null
      const ctx = mainCanvas.getContext('2d')
      if (!ctx) return null

      const outImg = new Image()
      outImg.onload = () => {
        ctx.clearRect(0, 0, mainCanvas.width, mainCanvas.height)
        ctx.drawImage(outImg, 0, 0)

        // modelMat 업데이트
        props.setModelMat(window.cv.imread(mainCanvas))

        // 색상 적용 후 하이라이트 숨김
        props.setShowHighlight(false)
      }
      outImg.src = base64
      return window.cv.imread(mainCanvas)
    },
    [
      colorBrushColor,
      colorBrushOpacity,
      colorBrushSmoothEdges,
      props.currentBrushSegment,
      selectedColorBrushItem
    ]
  )

  const converFeatherRange = (value: number): number => {
    // 입력값을 0-1 사이로 정규화
    const normalized = value / 100
    // 1-20 범위로 변환
    return Math.round(normalized * 19 + 1)
  }

  return { applyColor }
}
