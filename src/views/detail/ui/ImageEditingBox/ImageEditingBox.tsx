'use client'

import * as React from 'react'

import Image from 'next/image'

import { URL_VARIATION_IMAGE } from '@/entities/detail/constant'

// import { ASPECT_RATIO_MAP_NUMBER } from '@/entities/detail/constant'
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
  boxRefs: React.MutableRefObject<Map<string, HTMLDivElement | null>>
}

export const ImageEditingBox = (props: ImageEditingBoxProps) => {
  const { containerRef, selectedVariation, boxes, setBoxes } = props

  const editedVariationList = useEditorStore((state) => state.items)

  const boardRef = React.useRef<HTMLDivElement>(null)

  const [containerStyle, setContainerStyle] =
    React.useState<React.CSSProperties>({})

  // const getType = () => {
  //   const boardRefHeight = boardRef.current?.clientHeight || 0
  //   const boardRefWidth = boardRef.current?.clientWidth || 0

  //   return boardRefHeight < boardRefWidth ? 'height' : 'width'
  // }

  const handleResize = () => {
    // const aspectRatioValue = selectedVariation?.aspectRatio
    // const aspectRatio = ASPECT_RATIO_MAP_NUMBER[aspectRatioValue!]
    //TODO: 수정수정
    const aspectRatio = 9 / 16

    // const type = aspectRatioValue === 'ASPECT_RATIO_1_1' ? getType() : 'height'
    const type = 'height'

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
    let imgUrl = ''

    if (!selectedVariation) return null

    const variationId = selectedVariation.variationId.toString()

    if (editedVariationList.has(variationId)) {
      const presentProperty = editedVariationList.get(variationId)?.present
      const presentAspectRatio = presentProperty!.ratio
      const presentFaceAngle = presentProperty!.angle

      const presentVariation = selectedVariation!.images!.find((item) => {
        return (
          item.ratio === presentAspectRatio && item.angle === presentFaceAngle
        )
      })

      imgUrl =
        process.env.NEXT_PUBLIC_API_MOCKING === 'enabled'
          ? presentVariation!.encryptedImageUrl
          : process.env.NEXT_PUBLIC_API_URL +
            URL_VARIATION_IMAGE +
            presentVariation!.encryptedImageUrl
    } else {
      imgUrl =
        process.env.NEXT_PUBLIC_API_MOCKING === 'enabled'
          ? selectedVariation?.images[0]?.encryptedImageUrl
          : process.env.NEXT_PUBLIC_API_URL +
            URL_VARIATION_IMAGE +
            selectedVariation.images[0]?.encryptedImageUrl
    }
    // TODO: 이미지 컨테이너 스타일도 변경되어야 함 버그버그

    return <Image src={imgUrl} alt="" fill style={{ objectFit: 'contain' }} />
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
      <div className="relative" style={{ ...containerStyle }}>
        <div className="w-full h-full" ref={containerRef}>
          {selectedVariation ? renderImage() : null}
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
