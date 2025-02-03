import { useCallback } from 'react'

import {
  applyMultiplyAndFeather,
  dyeHairColor
} from '@/views/canvas/lib/editColorService'
import {
  useColorBrushStore,
  useHairColorStore
} from '@/views/canvas/model/useEditorPanelsStore'
import {
  MAX_CUSTOM_BRUSHES,
  createCustomBrush
} from '@/views/canvas/ui/editor-panels/color-brush/model'

interface UseCanvasApplyColorProps {
  canvasRef: React.RefObject<HTMLCanvasElement>
  modelMat: cv.Mat | null
  maskMatRef: React.RefObject<cv.Mat>
  hairMaskMatRef: React.RefObject<cv.Mat>
  setModelMat: (val: cv.Mat) => void
  setShowHighlight: (val: boolean) => void
  currentBrushSegment: number | null
  setCurrentBrushSegment: (val: number | null) => void
}

export const useCanvasApplyColor = (props: UseCanvasApplyColorProps) => {
  const {
    selectedColorBrushItem,
    customBrushes,
    addCustomBrush,
    setSelectedColorBrushItem,
    colorBrushSmoothEdges
  } = useColorBrushStore()

  const hairColor = useHairColorStore((state) => state.hairColor)
  const hairColorOpacity = useHairColorStore((state) => state.hairColorOpacity)

  const colorBrushOpacity = useColorBrushStore(
    (state) => state.colorBrushOpacity
  )
  const colorBrushColor = useColorBrushStore((state) => state.colorBrushColor)

  const applyColor = useCallback(() => {
    if (!props.modelMat || !props.maskMatRef.current) return

    // hair 모드일 경우, 고정 segment 목록
    // 아닐 경우, 현재 선택된 브러시 세그먼트 목록 or 신규 브러시 segment
    const segmentsToColor =
      selectedColorBrushItem?.segments ??
      (props.currentBrushSegment ? [props.currentBrushSegment] : null)

    if (!segmentsToColor) return

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

    const segmentFeatherMap = new Map<number, number>()
    segmentsToColor.forEach((segment) => {
      segmentFeatherMap.set(segment, (colorBrushSmoothEdges / 100) * 30)
    })

    const base64 = applyMultiplyAndFeather(
      props.modelMat,
      props.maskMatRef.current,
      colorBrushOpacity,
      colorBrushColor,
      1,
      'type1',
      segmentsToColor,
      segmentFeatherMap
    )

    const mainCanvas = props.canvasRef.current
    if (!mainCanvas) return
    const ctx = mainCanvas.getContext('2d')
    if (!ctx) return

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
  }, [
    colorBrushColor,
    colorBrushOpacity,
    colorBrushSmoothEdges,
    props.currentBrushSegment,
    selectedColorBrushItem
  ])

  const applyHairColor = useCallback(() => {
    if (!props.modelMat || !props.hairMaskMatRef.current || !hairColor) return

    const base64 = dyeHairColor(
      props.modelMat,
      props.hairMaskMatRef.current,
      10,
      hairColorOpacity,
      0.0,
      hairColor
    )

    const mainCanvas = props.canvasRef.current
    if (!mainCanvas) return
    const ctx = mainCanvas.getContext('2d')
    if (!ctx) return

    const outImg = new Image()
    outImg.onload = () => {
      ctx.clearRect(0, 0, mainCanvas.width, mainCanvas.height)
      ctx.drawImage(outImg, 0, 0)
    }

    outImg.src = base64

    // modelMat 업데이트
    props.setModelMat(window.cv.imread(mainCanvas))
  }, [hairColor, hairColorOpacity])

  return { applyColor, applyHairColor }
}
