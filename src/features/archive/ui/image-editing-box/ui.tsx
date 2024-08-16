'use client'

import Image from 'next/image'
import { useRef } from 'react'
import {
  Box,
  ResizableAndDraggableBoxes
} from '@/features/archive/ui/resizable-and-draggable-boxes'
import { ExportButton } from '@/features/archive/ui/export-button'
import { Variation } from '@/views/detail/model'
import {
  URL_GENERATED_AI_IMAGE_FILE,
  URL_VARIATION_LIST_IMAGE
} from '@/views/detail/constant'
import { cn } from '@/shared/lib/utils'
import LoadingSpinner from '/public/icons/loading-spinner.svg'

type ImageEditingBoxProps = {
  boxes: Box[]
  setBoxes: React.Dispatch<React.SetStateAction<Box[]>>
  selectedVariation: Variation | null
  generatingProgress: number
  generatedNewImage: {
    isCompleted: boolean
    encodedGenerateId: string
  }
}

const AspectRatioMap = {
  ASPECT_RATIO_16_9: 16 / 9,
  ASPECT_RATIO_4_3: 4 / 3,
  ASPECT_RATIO_1_1: 1 / 1,
  ASPECT_RATIO_3_4: 3 / 4,
  ASPECT_RATIO_9_16: 9 / 16
}

export const ImageEditingBox = ({
  boxes,
  setBoxes,
  selectedVariation,
  generatingProgress,
  generatedNewImage
}: ImageEditingBoxProps) => {
  const containerRef = useRef<HTMLDivElement>(null)

  // const convertAspectRatio = (aspectRatioString: string): number => {
  //   const [numerator, denominator] = aspectRatioString.split('/')
  //   return Number(numerator) / Number(denominator)
  // }
  // const aspectRatio = convertAspectRatio(
  //   selectedVariation?.properties.aspectRatio || '16/9'
  // )

  const isGenerating = !!generatingProgress && generatingProgress < 100

  const imgUrl =
    process.env.NEXT_PUBLIC_API_URL +
    `${
      generatedNewImage.isCompleted
        ? URL_GENERATED_AI_IMAGE_FILE +
          '/' +
          generatedNewImage.encodedGenerateId
        : URL_VARIATION_LIST_IMAGE + '/' + selectedVariation?.encodedBaseImageId
    }`

  return (
    <>
      <div className="text-right mb-[20px]">
        <ExportButton containerRef={containerRef} className="ml-auto">
          Download
        </ExportButton>
      </div>
      <div
        className={cn(
          'h-[572px] bg-neutral-1 rounded-[0.5rem] overflow-hidden relative flex justify-center w-[100%]',
          {
            'z-20': isGenerating
          }
        )}
      >
        {isGenerating ? (
          <div className="z-30 absolute inset-0 pointer-event-none">
            <div className="absolute top-[12px] right-[12px] rounded-[4px] p-2 bg-neutral-0-50 text-[12px]">
              Realtime:{' '}
              <span className="text-primary">{generatingProgress}%</span>
            </div>
            <div className="absolute-center bg-[rgba(32,33,36,0.90)] rounded-[8px] py-3 px-5">
              <div className="flex items-center gap-2">
                <div className="w-[1rem] h-[1rem] relative">
                  <LoadingSpinner className="animate-spin" />
                </div>
                <p className="text-[12px] text-neutral-7">
                  Hold on! Magic in progress...
                </p>
              </div>
            </div>
          </div>
        ) : null}
        <div
          ref={containerRef}
          className="relative m-auto"
          style={{
            aspectRatio: selectedVariation
              ? AspectRatioMap[selectedVariation?.properties.aspectRatio]
              : 9 / 16,
            ...(selectedVariation?.properties.aspectRatio ===
              'ASPECT_RATIO_16_9' ||
            selectedVariation?.properties.aspectRatio === 'ASPECT_RATIO_4_3'
              ? { height: '100%' }
              : { width: '100%' })
          }}
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
        {/* TODO: toast */}
        {/* {isShowToast ? (
          <div className="z-30 absolute bottom-[20px] left-[50%] -translate-x-[50%]">
            <div className="flex items-center py-2 pr-2 rounded-md bg-black/80">
              <div className="mx-5 flex flex-col gap-1">
                <p className="text-[12px] text-nowrap font-[700]">
                  Love what you see?
                </p>
                <p className="text-[12px] text-nowrap text-neutral-7">
                  The magic might look different next time!
                </p>
              </div>
              <ExportButton
                containerRef={containerRef}
                className="ml-auto bg-white text-black font-[600] active:text-black hover:text-black"
              >
                Download it now
              </ExportButton>
            </div>
          </div>
        ) : null} */}
      </div>
    </>
  )
}
