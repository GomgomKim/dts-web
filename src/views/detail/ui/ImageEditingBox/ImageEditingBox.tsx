'use client'

import * as React from 'react'

import { useAuthStore } from '@/entities/UserProfile/store'
import { ASPECT_RATIO_MAP } from '@/entities/detail/constant'

import { Variation } from '@/shared/api/types'
import { LoadingSpinner } from '@/shared/ui/LoadingSpinner'

import { useEditorStore } from '../../model/useEditorHistoryStore'
import { useGetNewStyleContainerWrapper } from './lib/useGetNewStyleContainerWrapper'
import { Box } from './types'
import { CreditToast } from './ui/CreditToast/CreditToast'
import { HistoryControl } from './ui/HistoryControl/HistoryControl'
import { ImageView } from './ui/ImageView/ImageView'
import { ResizableAndDraggableBoxes } from './ui/ResizableAndDraggableBoxes'

interface ImageEditingBoxProps {
  isLoading: boolean
  containerRef: React.RefObject<HTMLDivElement>
  boxes: Box[]
  selectedVariation: Variation | null
  boxRefs: React.MutableRefObject<Map<string, HTMLDivElement | null>>
  onKeydownRemoveBrandAsset: (boxId: string) => void
}

export const ImageEditingBox = (props: ImageEditingBoxProps) => {
  const { containerRef, selectedVariation, boxes } = props
  const boardRef = React.useRef<HTMLDivElement>(null)

  const editedVariationList = useEditorStore((state) => state.items)
  const restriction = useAuthStore((state) => state.restriction)
  const [openToast, setOpenToast] = React.useState(() =>
    restriction ? restriction.current >= restriction.max : false
  )

  const [styleContainerWrapper, setStyleContainerWrapper] =
    React.useState<React.CSSProperties>({})
  const getNewStyleContainerWrapper = useGetNewStyleContainerWrapper(boardRef)

  const variationId =
    selectedVariation && selectedVariation.variationId.toString()

  const variationCurrent =
    (variationId &&
      editedVariationList.has(variationId) &&
      editedVariationList.get(variationId)?.present) ||
    null

  const handleImageStyleSize = React.useCallback(() => {
    let aspectRatio = '9:16'

    if (variationCurrent !== null) {
      const { ratio } = variationCurrent
      aspectRatio = ASPECT_RATIO_MAP[ratio]
    }

    const updatedStyle = getNewStyleContainerWrapper(aspectRatio)
    if (updatedStyle !== null) setStyleContainerWrapper(updatedStyle)
  }, [selectedVariation, variationCurrent])

  // 1. 화면 리사이징할 때
  // 2. selected Variation이 바뀔 때
  // 3. 이미지 option이 변경될 때
  React.useEffect(() => {
    if (!selectedVariation) return

    handleImageStyleSize()

    window.addEventListener('resize', handleImageStyleSize)
    return () => {
      window.removeEventListener('resize', handleImageStyleSize)
    }
  }, [selectedVariation, variationCurrent])

  React.useEffect(() => {
    if (restriction === null) return
    if (restriction?.current >= restriction?.max) setOpenToast(true)
  }, [restriction])

  if (props.isLoading || !selectedVariation)
    return (
      <div className="h-full bg-neutral-1 bg-opacity-50 rounded-[0.5rem] overflow-hidden relative flex justify-center">
        <LoadingSpinner width="40" height="40" />
      </div>
    )

  return (
    <div
      id="board"
      ref={boardRef}
      className="h-full bg-neutral-1 bg-opacity-50 rounded-[0.5rem] overflow-hidden relative flex justify-center"
    >
      <div
        id="history-controller"
        className="absolute top-[0.5rem] left-[0.5rem] rounded-[0.25rem] bg-neutral-0 bg-opacity-90 z-[30]"
      >
        <HistoryControl />
      </div>
      <div
        id="container-wrapper"
        className="relative"
        style={{ ...styleContainerWrapper }}
      >
        <div id="container" className="w-full h-full" ref={containerRef}>
          <ImageView selectedVariation={selectedVariation} />
          <ResizableAndDraggableBoxes
            containerRef={boardRef}
            boxes={boxes}
            boxRefs={props.boxRefs}
            onKeydownRemoveBrandAsset={props.onKeydownRemoveBrandAsset}
          />
        </div>
      </div>
      {openToast ? (
        <CreditToast onClickGotIt={() => setOpenToast(false)} />
      ) : null}
    </div>
  )
}
