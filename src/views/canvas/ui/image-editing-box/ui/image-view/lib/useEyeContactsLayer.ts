import { useEffect } from 'react'

import { getBlackEyesFace } from '@/views/canvas/lib/eyeContactsService'
import { useLayerVisibilityStore } from '@/views/canvas/model/useLayerVisibilityStore'

import { AI_TOOL } from '@/widgets/canvas-sidebar/model/types'

import { useLayersStore } from './useLayersStore'

interface UseEyeContactsLayerProps {
  targetSize: number
  modelMat: cv.Mat | null
  maskMat: cv.Mat | null
}

export const useEyeContactsLayer = (props: UseEyeContactsLayerProps) => {
  const setActiveTool = useLayerVisibilityStore((state) => state.setActiveTool)
  const setEyeContactsLayer = useLayersStore(
    (state) => state.setEyeContactsLayer
  )

  useEffect(() => {
    // AI_TOOL.EYE_CONTACTS를 활성화합니다.
    setActiveTool(AI_TOOL.EYE_CONTACTS)
  }, [setActiveTool])

  useEffect(() => {
    if (!props.modelMat || !props.maskMat) return

    const foreLayer = getBlackEyesFace(props.modelMat, props.maskMat)
    setEyeContactsLayer(foreLayer)
  }, [props.modelMat, props.maskMat, setEyeContactsLayer])
}
