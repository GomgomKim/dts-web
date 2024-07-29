import {
  type Box,
  ResizableAndDraggableBoxes
} from '@/features/archive/ui/ResizableAndDraggableBoxes'
import { ExportButton } from '@/features/archive/ui/ExportButton'
import { useRef, useState } from 'react'

export const ImageEditingBox = () => {
  const [boxes, setBoxes] = useState<Box[]>([
    {
      id: 1,
      left: 50,
      top: 50,
      width: 200,
      height: 200,
      image: '/images/model-1.png'
    },
    {
      id: 2,
      left: 200,
      top: 300,
      width: 150,
      height: 150,
      image: '/images/model-1.png'
    }
  ])
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <>
      <ExportButton containerRef={containerRef} />
      <div
        ref={containerRef}
        style={{
          position: 'relative',
          width: '400px',
          aspectRatio: 9 / 16,
          border: '1px solid black',
          backgroundColor: 'white'
        }}
      >
        <ResizableAndDraggableBoxes
          containerRef={containerRef}
          boxes={boxes}
          setBoxes={setBoxes}
        />
      </div>
    </>
  )
}
