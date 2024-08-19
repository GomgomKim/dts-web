'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { useSearchParams } from 'next/navigation'
import { AspectRatio, Variation } from '@/entities/detail/model'
import {
  ASPECT_RATIO_REVERT_MAP,
  ASPECT_RATIO_MAP_NUMBER,
  URL_GENERATED_AI_IMAGE_FILE,
  URL_VARIATION_LIST_IMAGE
} from '@/entities/detail/constant'
import { cn } from '@/shared/lib/utils'
import { ProgressInfo } from './ProgressInfo'
import { LoadingInfo } from './LoadingInfo'
import { DownloadNowToast } from './DownloadNowToast'
import { ResizableAndDraggableBoxes } from './ResizableAndDraggableBoxes'
import { Box } from './type'

type Props = {
  containerRef: React.RefObject<HTMLDivElement>
  boxes: Box[]
  setBoxes: React.Dispatch<React.SetStateAction<Box[]>>
  selectedVariation: Variation | null
  generatingProgress: number
  generatedNewImage: {
    isCompleted: boolean
    encodedGenerateId: string
  }
}

export const ImageEditingBox = (props: Props) => {
  const {
    containerRef,
    generatedNewImage,
    generatingProgress,
    selectedVariation,
    boxes,
    setBoxes
  } = props

  const searchParams = useSearchParams()
  const [isShowToast, setIsShowToast] = useState(
    !!generatedNewImage.encodedGenerateId
  )

  useEffect(() => {
    if (
      generatedNewImage.isCompleted === false ||
      generatedNewImage.encodedGenerateId === ''
    )
      return
    setTimeout(() => {
      setIsShowToast(true)
    }, 1000)
    setTimeout(() => {
      setIsShowToast(false)
    }, 2500)
  }, [generatedNewImage])

  const isGenerating = !!generatedNewImage.encodedGenerateId

  const imgUrl =
    process.env.NEXT_PUBLIC_API_URL +
    `${
      generatedNewImage.isCompleted
        ? URL_GENERATED_AI_IMAGE_FILE +
          '/' +
          generatedNewImage.encodedGenerateId
        : URL_VARIATION_LIST_IMAGE + '/' + selectedVariation?.encodedBaseImageId
    }`

  const getContainerStyle = (): React.CSSProperties => {
    if (!selectedVariation) return { aspectRatio: 9 / 16, height: '100%' }

    let value: AspectRatio
    if (generatedNewImage.isCompleted && generatedNewImage.encodedGenerateId) {
      value =
        ASPECT_RATIO_REVERT_MAP[
          searchParams.get(
            'aspectRatio'
          ) as keyof typeof ASPECT_RATIO_REVERT_MAP
        ]
    } else {
      value = selectedVariation?.properties.aspectRatio
    }

    const aspectRatio = ASPECT_RATIO_MAP_NUMBER[value]
    const type =
      value === 'ASPECT_RATIO_16_9' || value === 'ASPECT_RATIO_4_3'
        ? 'height'
        : 'width'

    return { aspectRatio: aspectRatio, [type]: '100%' }
  }

  return (
    <>
      <div
        className={cn(
          'h-full bg-neutral-1 rounded-[0.5rem] overflow-hidden relative flex justify-center',
          {
            'z-20': isGenerating
          }
        )}
      >
        <div
          ref={containerRef}
          className="relative m-auto"
          style={{ ...getContainerStyle() }}
        >
          {selectedVariation && (
            <Image
              src={imgUrl}
              alt=""
              fill
              style={{
                objectFit: 'contain'
              }}
            />
          )}
          <ResizableAndDraggableBoxes
            containerRef={containerRef}
            boxes={boxes}
            setBoxes={setBoxes}
          />
        </div>
        {isGenerating ? (
          <div className="z-30 absolute inset-0 pointer-event-none">
            <ProgressInfo progress={generatingProgress} />
            <LoadingInfo />
          </div>
        ) : null}
        {/* open toast when new image is generated  */}
        {isShowToast ? <DownloadNowToast containerRef={containerRef} /> : null}
      </div>
      {isGenerating ? (
        <div className="z-10 fixed inset-0 bg-neutral-0-70" />
      ) : null}
    </>
  )
}
