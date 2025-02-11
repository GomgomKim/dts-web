import { useCallback } from 'react'

import {
  dyeHairColor,
  updateOriginalModelMat
} from '@/views/canvas/lib/editColorService'
import { useHairColorStore } from '@/views/canvas/model/useEditorPanelsStore'

interface UseApplyHairColorProps {
  canvasRef: React.RefObject<HTMLCanvasElement>
  modelMat: cv.Mat | null
  maskMatRef: React.RefObject<cv.Mat>
  hairMaskMatRef: React.RefObject<cv.Mat>
  setModelMat: (val: cv.Mat) => void
  setShowHighlight: (val: boolean) => void
  currentBrushSegment: number | null
  setCurrentBrushSegment: (val: number | null) => void
}

export const useApplyHairColor = (props: UseApplyHairColorProps) => {
  const hairColor = useHairColorStore((state) => state.hairColor)
  const hairColorOpacity = useHairColorStore((state) => state.hairColorOpacity)
  const hairColorLevel = useHairColorStore((state) => state.hairColorLevel)

  const applyHairColor = useCallback((): cv.Mat | null => {
    if (!props.modelMat || !props.hairMaskMatRef.current || !hairColor)
      return null

    const base64 = dyeHairColor(
      props.modelMat,
      props.hairMaskMatRef.current,
      10,
      hairColorOpacity,
      (hairColorLevel / 100 - 0.5) * 0.4,
      hairColor
    )

    const mainCanvas = props.canvasRef.current
    if (!mainCanvas) return null
    const ctx = mainCanvas.getContext('2d')
    if (!ctx) return null

    const outImg = new Image()
    outImg.onload = () => {
      ctx.clearRect(0, 0, mainCanvas.width, mainCanvas.height)
      ctx.drawImage(outImg, 0, 0)

      // 캔버스의 최종 결과를 읽어와서 modelMat 업데이트
      const newMat = window.cv.imread(mainCanvas)
      props.setModelMat(newMat)
      updateOriginalModelMat(newMat)
    }

    outImg.src = base64

    // modelMat 업데이트
    props.setModelMat(window.cv.imread(mainCanvas))
    return window.cv.imread(mainCanvas)
  }, [hairColor, hairColorOpacity, hairColorLevel])

  return { applyHairColor }
}
