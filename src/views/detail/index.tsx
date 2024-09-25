'use client'

import { Suspense, useRef, useState } from 'react'

import { useImagePreviewUrlStore } from '@/entities/detail/store'

import { Variation } from '@/shared/api/types'
import { useSetQueryString } from '@/shared/lib/hooks/useSetQueryString'

import { convertImagesToBoxData } from './lib'
import { BrandAssets } from './ui/BrandAssets'
import { DownloadDropdown } from './ui/DownloadDropdown'
import { EditVariation } from './ui/EditVariation'
import { ImageEditingBox } from './ui/ImageEditingBox'
import { Box } from './ui/ImageEditingBox/types'
import { NewGenerateButton } from './ui/NewGenerateButton'
import { VariationsList } from './ui/VariationList'

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

  const { handleQueryString } = useSetQueryString({ option: 'replace' })
  const handleSelectedVariation = (variation: Variation) => {
    setSelectedVariation(variation)
    handleQueryString([{ variationId: variation.variationId.toString() }])
  }

  return (
    <div className="flex w-full h-full">
      {/* brand assets section */}
      <div className="w-[320px] xl:w-[387px] fixed px-5 bg-background z-20">
        <BrandAssets
          onClickAddBrandAssets={handleAddBrandAssets}
          handleRemoveBox={handleRemoveBox}
          assetDisabled={assetImages.size < 1}
        />
      </div>

      {/* generate section */}
      <div className="h-full ml-[320px] xl:ml-[407px] grow">
        <div className="h-full overflow-x-scroll flex gap-5">
          {/* generate section - left */}
          <section className="overflow-y-auto overflow-x-hidden basis-[513px] shrink-0 grow">
            <div className="flex flex-col relative h-full">
              <div className="sticky top-0 w-full z-10">
                <h2 className="text-[1.5rem] inline-block">Generate</h2>

                <span className="absolute top-0 right-0">
                  <NewGenerateButton />
                </span>
              </div>

              <div className="mt-5 grow">
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
                      <VariationsList
                        onChangeSelectedVariation={handleSelectedVariation}
                      />
                    </Suspense>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* generate section - right */}
          <div className="overflow-y-auto overflow-x-hidden basis-[407px] shrink-0">
            <div className="flex flex-col gap-5 ">
              {/* related variations options /////////////////////////////////////////////  */}
              <EditVariation selectedVariation={selectedVariation} />

              {/* related download image /////////////////////////////////////////////  */}
              <DownloadDropdown
                containerRef={containerRef}
                // TODO:
                selectedVariation={null} // + history store present options
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
