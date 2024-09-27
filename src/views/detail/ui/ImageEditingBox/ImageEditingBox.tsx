'use client'

import * as React from 'react'

import { Variation } from '@/shared/api/types'
import { cn } from '@/shared/lib/utils'

import { useGetNewStyleContainerWrapper } from './lib/useGetNewStyleContainerWrapper'
import { Box } from './types'
import { HistoryControl } from './ui/HistoryControl/HistoryControl'
import { ImageView } from './ui/ImageView/ImageView'
import { ResizableAndDraggableBoxes } from './ui/ResizableAndDraggableBoxes'

interface ImageEditingBoxProps {
  containerRef: React.RefObject<HTMLDivElement>
  boxes: Box[]
  setBoxes: React.Dispatch<React.SetStateAction<Box[]>>
  selectedVariation: Variation | null
  boxRefs: React.MutableRefObject<Map<string, HTMLDivElement | null>>
}

export const ImageEditingBox = (props: ImageEditingBoxProps) => {
  const { containerRef, selectedVariation, boxes, setBoxes } = props
  const boardRef = React.useRef<HTMLDivElement>(null)

  const [styleContainerWrapper, setStyleContainerWrapper] =
    React.useState<React.CSSProperties>({})

  // TODO: memo) 훅 내에서 searchParams의 variationId를 사용하는게 아니라 selectedVariation을 넘겨줘야 히스토리 스토어 present 옵션이랑 싱크됨
  const getNewStyleContainerWrapper = useGetNewStyleContainerWrapper(
    boardRef,
    selectedVariation
  )

  const handleResize = () => {
    if (!selectedVariation) return

    const updatedStyle = getNewStyleContainerWrapper()

    if (updatedStyle !== null) setStyleContainerWrapper(updatedStyle)
  }

  React.useEffect(() => {
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [handleResize])

  return (
    <div
      id="board"
      ref={boardRef}
      className={cn(
        'h-full bg-neutral-1 bg-opacity-50 rounded-[0.5rem] overflow-hidden relative flex justify-center'
      )}
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
          <ImageView
            selectedVariation={selectedVariation}
            onChangeImage={handleResize}
          />
          <ResizableAndDraggableBoxes
            containerRef={containerRef}
            boxes={boxes}
            setBoxes={setBoxes}
            boxRefs={props.boxRefs}
          />
        </div>
      </div>
    </div>
  )
}
