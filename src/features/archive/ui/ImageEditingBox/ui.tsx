'use client'

import {
  type Box,
  ResizableAndDraggableBoxes
} from '@/features/archive/ui/ResizableAndDraggableBoxes'
import { ExportButton } from '@/features/archive/ui/ExportButton'
import { useRef, useState } from 'react'

const images = [
  {
    id: 1,
    image: '/images/dwe-tint-text.png'
  },
  {
    id: 2,
    image: '/images/dwe-tint.png'
  }
]

export const ImageEditingBox = () => {
  const boxesData = images.map((imageData) => ({
    ...imageData,
    left: 100,
    top: 100,
    width: 200,
    height: 200,
    zIndex: 1
  }))

  const [boxes, setBoxes] = useState<Box[]>(boxesData)
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <>
      <ExportButton containerRef={containerRef} />
      <div className="min-w-[560px] bg-neutral-1 rounded-[0.5rem] overflow-hidden relative flex justify-center">
        <div
          ref={containerRef}
          style={{
            position: 'relative',
            width: '400px',
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
