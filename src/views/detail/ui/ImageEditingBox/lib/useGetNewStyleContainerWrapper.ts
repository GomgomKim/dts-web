import * as React from 'react'

import { useEditorStore } from '@/views/detail/model/useEditorHistoryStore'

import {
  ASPECT_RATIO_MAP,
  ASPECT_RATIO_MAP_NUMBER,
  ASPECT_RATIO_REVERT_MAP
} from '@/entities/detail/constant'

import { Variation } from '@/shared/api/types'

export const useGetNewStyleContainerWrapper = (
  boardRef: React.RefObject<HTMLDivElement>,
  selectedVariation: Variation | null
) => {
  const variationId = selectedVariation?.variationId.toString()

  const editedVariationList = useEditorStore((state) => state.items)

  const getType = React.useCallback(() => {
    const boardRefHeight = boardRef.current?.clientHeight || 0
    const boardRefWidth = boardRef.current?.clientWidth || 0

    return boardRefHeight < boardRefWidth ? 'height' : 'width'
  }, [boardRef])

  const getNewStyleContainerWrapper = () => {
    if (!variationId) return null

    let aspectRatio = '9:16'
    if (editedVariationList.has(variationId)) {
      const { ratio } = editedVariationList.get(variationId)!.present
      aspectRatio = ASPECT_RATIO_MAP[ratio]
    }
    const type = aspectRatio === '1:1' ? getType() : 'height'

    const newStyle: React.CSSProperties = {
      aspectRatio:
        ASPECT_RATIO_MAP_NUMBER[ASPECT_RATIO_REVERT_MAP[aspectRatio]],
      [type]: '100%'
    }

    return newStyle
  }

  return getNewStyleContainerWrapper
}
