'use client'

import {
  Box,
  ResizableAndDraggableBoxes
} from '@/features/archive/ui/resizable-and-draggable-boxes'
import { ExportButton } from '@/features/archive/ui/export-button'
import { useRef } from 'react'

type ImageEditingBoxProps = {
  boxes: Box[]
  setBoxes: React.Dispatch<React.SetStateAction<Box[]>>
}

export const ImageEditingBox = ({ boxes, setBoxes }: ImageEditingBoxProps) => {
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <>
      <div className="text-right mb-[20px]">
        <ExportButton containerRef={containerRef} className="ml-auto" />
      </div>
      <div className="h-[572px] bg-neutral-1 rounded-[0.5rem] overflow-hidden relative flex justify-center w-[100%] aspect-square">
        <div
          ref={containerRef}
          style={{
            position: 'relative',
            aspectRatio: 9 / 16, // TODO: url query optional
            border: '1px solid black',
            background:
              'url(/images/model-gen-1.png) no-repeat center center / cover'
          }}
        >
          <ResizableAndDraggableBoxes
            containerRef={containerRef}
            boxes={boxes}
            setBoxes={setBoxes}
          />
        </div>
      </div>
    </>
  )
}
