'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

import { ASPECT_RATIO_MAP } from '@/entities/generate/constant'

import { Variation } from '@/shared/api/types'
import { LoadingSpinner } from '@/shared/ui/LoadingSpinner'

import { useEditorStore } from '../../model/useEditorHistoryStore'
import { useGetNewStyleContainerWrapper } from './lib/useGetNewStyleContainerWrapper'
import { Box } from './types'
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
  children: React.ReactNode
}

export const ImageEditingBox = (props: ImageEditingBoxProps) => {
  const { containerRef, selectedVariation, boxes } = props
  const boardRef = useRef<HTMLDivElement>(null)

  const editedVariationList = useEditorStore((state) => state.items)

  const [styleContainerWrapper, setStyleContainerWrapper] =
    useState<React.CSSProperties>({})
  const getNewStyleContainerWrapper = useGetNewStyleContainerWrapper(boardRef)

  const variationId =
    selectedVariation && selectedVariation.variationId.toString()

  const variationCurrent =
    (variationId &&
      editedVariationList.has(variationId) &&
      editedVariationList.get(variationId)?.present) ||
    null

  const handleImageStyleSize = useCallback(() => {
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
  useEffect(() => {
    if (!selectedVariation) return

    handleImageStyleSize()

    window.addEventListener('resize', handleImageStyleSize)
    return () => {
      window.removeEventListener('resize', handleImageStyleSize)
    }
  }, [selectedVariation, variationCurrent])

  if (props.isLoading || !selectedVariation)
    return (
      <div className="relative flex h-full justify-center overflow-hidden rounded-[0.5rem] bg-neutral-1/50">
        <LoadingSpinner width="40" height="40" />
      </div>
    )

  return (
    <div
      id="board"
      ref={boardRef}
      className="relative flex h-full justify-center overflow-hidden rounded-[0.5rem] bg-neutral-1/50"
    >
      <div
        id="history-controller"
        className="absolute left-2 top-2 z-30 rounded bg-neutral-0/90"
      >
        <HistoryControl />
      </div>
      <div
        id="container-wrapper"
        className="relative"
        style={{ ...styleContainerWrapper }}
      >
        <div id="container" className="size-full" ref={containerRef}>
          <ImageView selectedVariation={selectedVariation} />
          <ResizableAndDraggableBoxes
            containerRef={boardRef}
            boxes={boxes}
            boxRefs={props.boxRefs}
            onKeydownRemoveBrandAsset={props.onKeydownRemoveBrandAsset}
          />
        </div>
      </div>
      {/* out of credit toast */}
      {props.children}
    </div>
  )
}
