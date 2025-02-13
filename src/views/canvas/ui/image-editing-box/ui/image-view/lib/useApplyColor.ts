import { useCallback } from 'react'

import { applyMultiplyAndFeather } from '@/views/canvas/lib/editColorService'
import { useColorBrushStore } from '@/views/canvas/model/useEditorPanelsStore'
import {
  MAX_CUSTOM_BRUSHES,
  createCustomBrush
} from '@/views/canvas/ui/editor-panels/color-brush/model'

import { brushSegmentMap } from '../model/constants'
import { useLayersStore } from './useLayersStore'

interface UseApplyColorProps {
  modelMat: cv.Mat | null
  maskMatRef: React.RefObject<cv.Mat>
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
  const updateColorBrushLayer = useLayersStore(
    (state) => state.updateColorBrushLayer
  )
  const applyColor = useCallback(
    (isHairColor?: boolean) => {
      if (!props.modelMat || !props.maskMatRef?.current) return null

      // 새로 그린 브러시가 아직 등록되지 않았다면 새로 등록
      if (
        !selectedColorBrushItem &&
        customBrushes.length < MAX_CUSTOM_BRUSHES
      ) {
        const newBrush = createCustomBrush(customBrushes.length + 1)
        addCustomBrush(newBrush)
        setSelectedColorBrushItem(newBrush)
      }

      const segmentToApply = mappingBrushSegment(selectedColorBrushItem?.id)
      if (segmentToApply === null || segmentToApply === undefined) return null

      const base64 = applyMultiplyAndFeather(
        props.modelMat,
        props.maskMatRef.current,
        converFeatherRange(colorBrushSmoothEdges),
        colorBrushOpacity,
        colorBrushColor,
        isHairColor ? 'type3' : 'type1',
        segmentToApply
      )

      if (selectedColorBrushItem) {
        updateColorBrushLayer(selectedColorBrushItem.id, base64)
      }
    },
    [
      colorBrushColor,
      colorBrushOpacity,
      colorBrushSmoothEdges,
      selectedColorBrushItem
    ]
  )

  const converFeatherRange = (value: number): number => {
    // 입력값을 0-1 사이로 정규화
    const normalized = value / 100
    // 1-20 범위로 변환
    return Math.round(normalized * 19 + 1)
  }

  const mappingBrushSegment = (brushId?: string) => {
    if (!brushId) return null
    return brushSegmentMap[brushId]
  }

  return { applyColor }
}
