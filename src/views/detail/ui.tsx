'use client'

import { Suspense, useRef, useState } from 'react'
import { ImageEditingBox } from '@/features/detail/ui/ImageEditingBox'
import { VariationsSection } from '@/features/detail/ui/VariationSection'
import { useImagePreviewUrlStore } from '@/features/detail/store'
import { Box } from '@/features/detail/ui/ImageEditingBox/type'
import { Variation } from '@/shared/api/types'
import { BrandAssets } from './BrandAssets'
import {
  ASPECT_RATIO_MAP,
  FACE_ANGLE_MAP,
  FACE_ANGLE_REVERT_MAP
} from '@/entities/detail/constant'
import { convertImagesToBoxData } from './util'
import { useSetQueryString } from '@/shared/lib/hooks/useSetQueryString'
import { GenerateVariation } from '@/features/detail/ui/GenerateVariation'
import { DownloadDropdown } from './DownloadDropdown'

export default function Detail() {
  // related brand assets
  const containerRef = useRef<HTMLDivElement>(null)
  const { imagePreviewUrls: assetImages } = useImagePreviewUrlStore()
  const [boxes, setBoxes] = useState<Box[]>([])

  const handleAddBrandAssets = () => {
    const boxesData = convertImagesToBoxData(assetImages)
    setBoxes(boxesData)
  }

  const handleRemoveBox = (id: string) => {
    const newBoxes = boxes.filter((box) => box.id !== id)
    setBoxes(newBoxes)
  }

  // related variations
  const [selectedVariation, setSelectedVariation] = useState<Variation | null>(
    null
  )
  const [aspectRatio, setAspectRatio] = useState<string>('')
  const [faceAngle, setFaceAngle] = useState<string>('')

  const { handleQueryString } = useSetQueryString({ option: 'replace' })

  const handleChangeAspectRatio = (value: string) => {
    setAspectRatio(value)
    handleQueryString([{ aspectRatio: value }])
  }

  const handleChangeFaceAngle = (value: string) => {
    setFaceAngle(value)
    handleQueryString([{ faceAngle: FACE_ANGLE_REVERT_MAP[value] }])
  }

  const handleSelectedVariation = (variation: Variation) => {
    setSelectedVariation(variation)

    const {
      encodedBaseImageId,
      properties: { aspectRatio, faceAngle }
    } = variation

    handleQueryString([{ variation: encodedBaseImageId }])

    handleChangeAspectRatio(ASPECT_RATIO_MAP[aspectRatio])
    handleChangeFaceAngle(FACE_ANGLE_MAP[faceAngle])
  }

  return (
    <div className="flex w-full h-full">
      {/* brand assets section */}
      <div className="w-[320px] xl:w-[387px] fixed px-5 bg-background z-20">
        <BrandAssets
          handleAddBrandAssets={handleAddBrandAssets}
          handleRemoveBox={handleRemoveBox}
          assetDisabled={assetImages.size < 1}
        />
      </div>

      {/* generate section */}
      <section className="h-full ml-[320px] xl:ml-[407px] grow">
        <div className="h-full overflow-x-scroll flex gap-5">
          {/* generate section - left */}
          <div className="overflow-y-auto overflow-x-hidden basis-[513px] shrink-0 grow">
            <div className="flex flex-col relative h-full">
              <div className="flex justify-between items-center sticky top-0 w-full z-10">
                <h2 className="text-[20px]">Generate</h2>
              </div>

              <div className="mt-5 grow">
                {/* <div className="flex"> */}
                <div className="flex flex-col gap-5 grow h-full">
                  {/* image editing section */}
                  <div className="grow relative max-h-[720px] min-h-[391px]">
                    <ImageEditingBox
                      containerRef={containerRef}
                      boxes={boxes}
                      setBoxes={setBoxes}
                      selectedVariation={selectedVariation}
                    />
                  </div>

                  {/* variations section */}
                  <div className="min-h-[180px]">
                    <Suspense fallback={<div>Loading...</div>}>
                      <VariationsSection
                        handleSelectedVariation={handleSelectedVariation}
                      />
                    </Suspense>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* generate section - right */}
          <div className="overflow-y-auto overflow-x-hidden basis-[407px] shrink-0">
            <div className="flex flex-col gap-5 ">
              {/* related variations options /////////////////////////////////////////////  */}
              <GenerateVariation
                aspectRatio={aspectRatio}
                faceAngle={faceAngle}
                handleChangeAspectRatio={handleChangeAspectRatio}
                handleChangeFaceAngle={handleChangeFaceAngle}
              />

              {/* related download image /////////////////////////////////////////////  */}
              <DownloadDropdown
                containerRef={containerRef}
                selectedVariation={selectedVariation}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
