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
      <div className="px-5 w-[360px] min-[1512px]:w-[440px] min-[2560px]:w-[480px] min-[3840px]:w-[770px] fixed bg-background z-20 h-[calc(100%-64px-20px)]">
        <BrandAssets
          isLoading={isLoading}
          onClickAddBrandAssets={handleClickAddBrandAssets}
          onChangeBrandAsset={handleChangeBrandAsset}
        />
      </div>

      {/* generate section */}
      <div className="h-full ml-[380px] min-[1512px]:ml-[460px] min-[2560px]:ml-[500px] min-[3840px]:ml-[790px] grow">
        <div className="h-full overflow-x-auto flex gap-10">
          {/* generate section - left */}
          <section className="overflow-y-auto overflow-x-hidden basis-[440px] shrink-0 grow">
            <div className="flex flex-col relative h-full">
              <div>
                <h2 className="text-[1.25rem] min-[1512px]:text-[1.5rem] min-[3840px]:text-[2rem] inline-block font-semibold">
                  Generate
                </h2>

                <span className="absolute top-0 right-0">
                  <NewGenerateButton disabled={isLoading} />
                </span>
              </div>

              <div className="mt-5 grow">
                <div className="flex flex-col gap-5 grow h-full">
                  {/* image editing section */}
                  <div className="grow relative min-h-[391px] min-[2560px]:min-h-[640px]">
                    <ImageEditingBox
                      isLoading={isLoading}
                      containerRef={containerRef}
                      boxes={boxes}
                      setBoxes={setBoxes}
                      boxRefs={boxRefs}
                      selectedVariation={selectedVariation}
                      onKeydownRemoveBrandAsset={handleChangeBrandAsset}
                    />
                  </div>

                  {/* variations section */}
                  <Variations
                    isLoading={isLoading}
                    onDataLoaded={() => setIsLoading(false)}
                    onChangeSelectedVariation={handleSelectedVariation}
                  />
                </div>
              </div>
            </div>
          </section>

          {/* generate section - right */}
          <div className="overflow-y-auto overflow-x-hidden shrink-0 basis-[360px] min-[1512px]:basis-[440px] min-[2560px]:basis-[480px] min-[3840px]:basis-[770px]">
            <div className="flex flex-col gap-3">
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
