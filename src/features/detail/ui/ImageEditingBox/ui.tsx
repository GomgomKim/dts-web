'use client'

import Image from 'next/image'
import { Variation } from '@/shared/api/types'
import {
  ASPECT_RATIO_MAP_NUMBER,
  URL_VARIATION_LIST_IMAGE
} from '@/entities/detail/constant'
import { cn } from '@/shared/lib/utils'
import { ResizableAndDraggableBoxes } from './ResizableAndDraggableBoxes'
import { Box } from './type'

type Props = {
  containerRef: React.RefObject<HTMLDivElement>
  boxes: Box[]
  setBoxes: React.Dispatch<React.SetStateAction<Box[]>>
  selectedVariation: Variation | null
}

export const ImageEditingBox = (props: Props) => {
  const { containerRef, selectedVariation, boxes, setBoxes } = props

  const imgUrl =
    process.env.NEXT_PUBLIC_API_MOCKING === 'enabled'
      ? selectedVariation!.encryptedImageUrl
      : process.env.NEXT_PUBLIC_API_URL +
        URL_VARIATION_LIST_IMAGE +
        selectedVariation?.encryptedImageUrl

  const getContainerStyle = (): React.CSSProperties => {
    if (!selectedVariation) return { aspectRatio: 9 / 16, height: '100%' }

    const aspectRatioValue = selectedVariation?.properties.aspectRatio

    const aspectRatio = ASPECT_RATIO_MAP_NUMBER[aspectRatioValue]
    const type =
      aspectRatioValue === 'ASPECT_RATIO_16_9' ||
      aspectRatioValue === 'ASPECT_RATIO_4_3'
        ? 'width'
        : 'height'
    // 1:1이면 상위 컨테이너의 짧은 길이에 맞추기

    return { aspectRatio: aspectRatio, [type]: '100%' }
  }

  return (
    <>
      <div
        className={cn(
          'h-full bg-neutral-1 bg-opacity-50 rounded-[0.5rem] overflow-hidden relative flex justify-center'
        )}
      >
        <div
          ref={containerRef}
          className="relative m-auto"
          style={{ ...getContainerStyle() }}
        >
          {selectedVariation && (
            <Image src={imgUrl} alt="" fill style={{ objectFit: 'contain' }} />
          )}
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
