'use client'

import * as React from 'react'

import Image from 'next/image'

import {
  ASPECT_RATIO_MAP_NUMBER,
  URL_VARIATION_LIST_IMAGE
} from '@/entities/detail/constant'

import { Variation } from '@/shared/api/types'
import { cn } from '@/shared/lib/utils'

import { Box } from './types'
import { ResizableAndDraggableBoxes } from './ui/ResizableAndDraggableBoxes'

interface ImageEditingBoxProps {
  containerRef: React.RefObject<HTMLDivElement>
  boxes: Box[]
  setBoxes: React.Dispatch<React.SetStateAction<Box[]>>
  selectedVariation: Variation | null
}

export const ImageEditingBox = (props: ImageEditingBoxProps) => {
  const { containerRef, selectedVariation, boxes, setBoxes } = props

  const boardRef = React.useRef<HTMLDivElement>(null)

  const imgUrl =
    process.env.NEXT_PUBLIC_API_MOCKING === 'enabled'
      ? selectedVariation?.encryptedImageUrl
      : process.env.NEXT_PUBLIC_API_URL +
        URL_VARIATION_LIST_IMAGE +
        selectedVariation?.encryptedImageUrl

  const [containerStyle, setContainerStyle] =
    React.useState<React.CSSProperties>({})

  const getType = () => {
    const boardRefHeight = boardRef.current?.clientHeight || 0
    const boardRefWidth = boardRef.current?.clientWidth || 0

    return boardRefHeight < boardRefWidth ? 'height' : 'width'
  }

  const handleResize = () => {
    const aspectRatioValue = selectedVariation?.properties.aspectRatio
    const aspectRatio = ASPECT_RATIO_MAP_NUMBER[aspectRatioValue!]

    const type = aspectRatioValue === 'ASPECT_RATIO_1_1' ? getType() : 'height'

    const newStyle: React.CSSProperties = {
      aspectRatio: aspectRatio,
      [type]: '100%'
    }
    setContainerStyle(newStyle)
  }

  React.useEffect(() => {
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [selectedVariation])

  return (
    <div
      ref={boardRef}
      className={cn(
        'h-full bg-neutral-1 bg-opacity-50 rounded-[0.5rem] overflow-hidden relative flex justify-center'
      )}
    >
      <div
        ref={containerRef}
        className="relative m-auto"
        style={{ ...containerStyle }}
      >
        {selectedVariation ? (
          <Image src={imgUrl} alt="" fill style={{ objectFit: 'contain' }} />
        ) : null}
        <ResizableAndDraggableBoxes
          containerRef={containerRef}
          boxes={boxes}
          setBoxes={setBoxes}
        />
      </div>
    </div>
  )
}
