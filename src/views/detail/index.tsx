'use client'

import * as React from 'react'

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
import { Variations } from './ui/Variations'

export default function Detail() {
  const [isLoading, setIsLoading] = React.useState(true)

  // related brand assets
  const containerRef = React.useRef<HTMLDivElement>(null)
  const { imagePreviewUrls: assetImages, removeImagePreviewUrl } =
    useImagePreviewUrlStore()
  const [boxes, setBoxes] = React.useState<Box[]>([])
  const boxRefs = React.useRef<Map<string, HTMLDivElement | null>>(new Map())

  const handleClickAddBrandAssets = () => {
    const boxesData = convertImagesToBoxData(assetImages)
    setBoxes(boxesData)
    boxRefs.current.clear()
  }

  const handleChangeBrandAsset = (id: string) => {
    removeImagePreviewUrl(id)
    const newBoxes = boxes.filter((box) => box.id !== id)
    setBoxes(newBoxes)
  }

  // related variations
  const [selectedVariation, setSelectedVariation] =
    React.useState<Variation | null>(null)

  const { handleQueryString } = useSetQueryString({ action: 'replace' })
  const handleSelectedVariation = (variation: Variation) => {
    setSelectedVariation(variation)
    // handleResize()
    handleQueryString([{ variationId: variation.variationId.toString() }])
  }

  return (
    <div className="flex w-full h-full">
      {/* brand assets section */}
      <div className="px-5 w-[320px] min-[1512px]:w-[427px] fixed bg-background z-20">
        <BrandAssets
          isLoading={isLoading}
          onClickAddBrandAssets={handleClickAddBrandAssets}
          onChangeBrandAsset={handleChangeBrandAsset}
        />
      </div>

      {/* generate section */}
      <div className="h-full ml-[320px] min-[1512px]:ml-[427px] grow">
        <div className="h-full overflow-x-scroll flex gap-5">
          {/* generate section - left */}
          <section className="overflow-y-auto overflow-x-hidden basis-[513px] shrink-0 grow">
            <div className="flex flex-col relative h-full">
              <div className="sticky top-0 w-full z-40">
                <h2 className="text-[1.5rem] inline-block font-semibold">
                  Generate
                </h2>

                <span className="absolute top-0 right-0">
                  <NewGenerateButton disabled={isLoading} />
                </span>
              </div>

              <div className="mt-5 grow">
                <div className="flex flex-col gap-5 grow h-full">
                  {/* image editing section */}
                  <div className="grow relative max-h-[720px] min-h-[391px]">
                    <ImageEditingBox
                      isLoading={isLoading}
                      containerRef={containerRef}
                      boxes={boxes}
                      setBoxes={setBoxes}
                      boxRefs={boxRefs}
                      selectedVariation={selectedVariation}
                    />
                  </div>

                  {/* variations section */}
                  <div className="min-h-[180px] max-h-[395px]">
                    <Variations
                      isLoading={isLoading}
                      onDataLoaded={() => setIsLoading(false)}
                      onChangeSelectedVariation={handleSelectedVariation}
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* generate section - right */}
          <div className="overflow-y-auto overflow-x-hidden basis-[407px] shrink-0">
            <div className="flex flex-col gap-5 ">
              {/* related variations options /////////////////////////////////////////////  */}
              <EditVariation
                selectedVariation={selectedVariation}
                isLoading={isLoading}
              />

              {/* related download image /////////////////////////////////////////////  */}
              <DownloadDropdown
                isLoading={isLoading}
                containerRef={containerRef}
                selectedVariation={selectedVariation}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
