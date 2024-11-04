'use client'

import * as React from 'react'

import { useAuthStore } from '@/entities/UserProfile/store'

import { Variation } from '@/shared/api/types'
import { useSetQueryString } from '@/shared/lib/hooks/useSetQueryString'

import { convertImageToBoxData } from './lib'
import { useBrandAssets } from './model/useBrandAssets'
import { BrandAssets } from './ui/BrandAssets'
import { CreditToast } from './ui/CreditToast'
import { DownloadDropdown } from './ui/DownloadDropdown'
import { EditVariation } from './ui/EditVariation'
import { ImageEditingBox } from './ui/ImageEditingBox'
import { Box } from './ui/ImageEditingBox/types'
import { NewGenerateButton } from './ui/NewGenerateButton'
import { Variations } from './ui/Variations'

export default function Generate() {
  const [isLoading, setIsLoading] = React.useState(true)
  const [isHoldingGenerate, setIsHoldingGenerate] = React.useState(false)

  const onHoldingGenerate = React.useCallback(() => {
    setIsHoldingGenerate(true)
    setTimeout(() => {
      setIsHoldingGenerate(false)
    }, 3000)
  }, [])

  // related brand assets
  const containerRef = React.useRef<HTMLDivElement>(null)
  const { imagePreviewUrls, addImagePreviewUrl, removeImagePreviewUrl } =
    useBrandAssets()
  const [boxes, setBoxes] = React.useState<Box[]>([])
  const boxRefs = React.useRef<Map<string, HTMLDivElement | null>>(new Map())

  const handleChangeBrandAssets = (id: string, previewImgSrc: string) => {
    addImagePreviewUrl(id, previewImgSrc)
    const boxData = convertImageToBoxData(id, previewImgSrc)
    setBoxes((prev) => [...prev, boxData])
    boxRefs.current.clear()
  }

  const removeBrandAsset = (id: string) => {
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

  // related credit
  const restriction = useAuthStore((state) => state.restriction)
  const [openToast, setOpenToast] = React.useState(() =>
    restriction !== null ? restriction.current <= 0 : false
  )

  React.useEffect(() => {
    if (restriction === null) return
    if (restriction.current <= 0) setOpenToast(true)
  }, [restriction])

  return (
    <div className="flex w-full h-full">
      {/* brand assets section */}
      <div className="px-5 w-[320px] md:w-[360px] lg:w-[440px] xl:w-[480px] 2xl:w-[770px] fixed bg-background z-20 h-[calc(100%-64px-20px)]">
        <BrandAssets
          isLoading={isLoading}
          imagePreviewUrls={imagePreviewUrls}
          onRemoveBrandAsset={removeBrandAsset}
          onChangeBrandAssets={handleChangeBrandAssets}
        />
      </div>

      {/* generate section */}
      <div className="h-full ml-[320px] md:ml-[360px] lg:ml-[460px] xl:ml-[500px] 2xl:ml-[790px] grow">
        <div className="h-full overflow-x-auto flex gap-5 lg:gap-10">
          {/* generate section - left */}
          <section className="overflow-y-auto overflow-x-hidden basis-[400px] shrink-0 grow">
            <div className="flex flex-col relative h-full">
              <div>
                <h2 className="text-[1.25rem] lg:text-[1.5rem] 2xl:text-[2rem] inline-block font-semibold">
                  Generate
                </h2>

                <span className="absolute top-0 right-0">
                  <NewGenerateButton
                    disabled={isLoading}
                    onErrorGenerate={() => setOpenToast(true)}
                    isHoldingGenerate={isHoldingGenerate}
                    onHoldingGenerate={onHoldingGenerate}
                  />
                </span>
              </div>

              <div className="mt-5 grow">
                <div className="flex flex-col gap-5 grow h-full">
                  {/* image editing section */}
                  <div className="grow relative min-h-[391px] xl:min-h-[640px]">
                    <ImageEditingBox
                      isLoading={isLoading}
                      containerRef={containerRef}
                      boxes={boxes}
                      boxRefs={boxRefs}
                      selectedVariation={selectedVariation}
                      onKeydownRemoveBrandAsset={removeBrandAsset}
                    >
                      {openToast ? (
                        <CreditToast onClickGotIt={() => setOpenToast(false)} />
                      ) : null}
                    </ImageEditingBox>
                  </div>

                  {/* variations section */}
                  <Variations
                    isLoading={isLoading}
                    onDataLoaded={() => setIsLoading(false)}
                    onChangeSelectedVariation={handleSelectedVariation}
                    onErrorGenerate={() => setOpenToast(true)}
                    onHoldingGenerate={onHoldingGenerate}
                  />
                </div>
              </div>
            </div>
          </section>

          {/* generate section - right */}
          <div className="overflow-y-auto overflow-x-hidden shrink-0 basis-[340px] md:basis-[360px] lg:basis-[440px] xl:basis-[480px] 2xl:basis-[770px]">
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
