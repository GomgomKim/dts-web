import { useCallback } from 'react'

import { applyMultiplyAndFeather } from '@/views/canvas/lib/editColorService'
import { useHairColorStore } from '@/views/canvas/model/useEditorPanelsStore'

import { useLayersStore } from './useLayersStore'

interface UseApplyHairColorProps {
  modelMat: cv.Mat | null
  maskMatRef: React.RefObject<cv.Mat>
}

export const useApplyHairColor = (props: UseApplyHairColorProps) => {
  const hairColor = useHairColorStore((state) => state.hairColor)
  const hairColorOpacity = useHairColorStore((state) => state.hairColorOpacity)
  const hairColorLevel = useHairColorStore((state) => state.hairColorLevel)
  const setHairColorLayer = useLayersStore((state) => state.setHairColorLayer)

  const applyHairColor = useCallback(() => {
    if (!props.modelMat || !props.maskMatRef?.current || !hairColor) return null

    const base64 = applyMultiplyAndFeather(
      props.modelMat,
      props.maskMatRef.current,
      10,
      hairColorOpacity,
      hairColor,
      'type3',
      null,
      mappingHairColorLevel(hairColorLevel)
    )

    setHairColorLayer(base64)
  }, [hairColor, hairColorOpacity, hairColorLevel])

  // hairColorLevel 값을 0.5 ~ 1.1 사이로 변환
  const mappingHairColorLevel = (value: number): number => {
    return 0.5 + (value / 100) * 0.6
  }

  return { applyHairColor }
}
