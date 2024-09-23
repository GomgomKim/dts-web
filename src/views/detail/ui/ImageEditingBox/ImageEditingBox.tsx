'use client'

import * as React from 'react'

import Image from 'next/image'

import {
  ASPECT_RATIO_MAP_NUMBER,
  URL_VARIATION_LIST_IMAGE
} from '@/entities/detail/constant'

import { Variation } from '@/shared/api/types'
import { cn } from '@/shared/lib/utils'

import { useEditorStore } from '../../model/useEditorHistoryStore'
import { Box } from './types'
import { HistoryControl } from './ui/HistoryControl/HistoryControl'
import { ResizableAndDraggableBoxes } from './ui/ResizableAndDraggableBoxes'

interface ImageEditingBoxProps {
  containerRef: React.RefObject<HTMLDivElement>
  boxes: Box[]
  setBoxes: React.Dispatch<React.SetStateAction<Box[]>>
  selectedVariation: Variation | null
}

export const ImageEditingBox = (props: ImageEditingBoxProps) => {
  const { containerRef, selectedVariation, boxes, setBoxes } = props

  const editedVariationList = useEditorStore((state) => state.items)

  const boardRef = React.useRef<HTMLDivElement>(null)

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

  const renderImage = React.useCallback(() => {
    //
    let imgUrl =
      process.env.NEXT_PUBLIC_API_URL +
      URL_VARIATION_LIST_IMAGE +
      selectedVariation?.encryptedImageUrl

    if (process.env.NEXT_PUBLIC_API_MOCKING === 'enabled') {
      if (!selectedVariation) return null

      if (editedVariationList.has(selectedVariation.encodedBaseImageId)) {
        const presentProperty = editedVariationList.get(
          selectedVariation.encodedBaseImageId
        )?.present
        const presentAspectRatio = presentProperty!.aspectRatio
        const presentFaceAngle = presentProperty!.faceAngle

        const presentVariation = selectedVariation!.variations!.find((item) => {
          return (
            item.properties.aspectRatio === presentAspectRatio &&
            item.properties.faceAngle === presentFaceAngle
          )
        })

        imgUrl = presentVariation?.encryptedImageUrl || ''
      } else {
        imgUrl = selectedVariation?.encryptedImageUrl
      }
    }
    // TODO: 이미지 컨테이너 스타일도 변경되어야 함 버그버그

    return (
      <Image src={imgUrl || ''} alt="" fill style={{ objectFit: 'contain' }} />
    )
  }, [selectedVariation, editedVariationList])

  return (
    <div
      ref={boardRef}
      className={cn(
        'h-full bg-neutral-1 bg-opacity-50 rounded-[0.5rem] overflow-hidden relative flex justify-center'
      )}
    >
      <div className="absolute top-[0.5rem] left-[0.5rem] rounded-[0.25rem] bg-neutral-0 bg-opacity-90 z-[30]">
        <HistoryControl />
      </div>
      <div
        ref={containerRef}
        className="relative m-auto"
        style={{ ...containerStyle }}
      >
        {selectedVariation ? renderImage() : null}
        <ResizableAndDraggableBoxes
          containerRef={containerRef}
          boxes={boxes}
          setBoxes={setBoxes}
        />
      </div>
    </div>
  )
}
