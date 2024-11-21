'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

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

interface GenerateProps {
  isGettingToken: boolean | null
}

export default function Generate(props: GenerateProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [isHoldingGenerate, setIsHoldingGenerate] = useState(false)

  const onHoldingGenerate = useCallback(() => {
    setIsHoldingGenerate(true)
    setTimeout(() => {
      setIsHoldingGenerate(false)
    }, 3000)
  }, [])

  // related brand assets
  const containerRef = useRef<HTMLDivElement>(null)
  const { imagePreviewUrls, addImagePreviewUrl, removeImagePreviewUrl } =
    useBrandAssets()
  const [boxes, setBoxes] = useState<Box[]>([])
  const boxRefs = useRef<Map<string, HTMLDivElement | null>>(new Map())

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
  const [selectedVariation, setSelectedVariation] = useState<Variation | null>(
    null
  )

  const { handleQueryString } = useSetQueryString({ action: 'replace' })
  const handleSelectedVariation = (
    variation: Variation,
    tags: string[] = []
  ) => {
    setSelectedVariation(variation)
    const variationId = variation.variationId.toString()
    handleQueryString([{ variationId, tagType: tags.join(',') }])
  }

  // related credit
  const restriction = useAuthStore((state) => state.restriction)
  const [openToast, setOpenToast] = useState(() =>
    restriction !== null ? restriction.current <= 0 : false
  )

  useEffect(() => {
    if (restriction === null) return
    if (restriction.current <= 0) setOpenToast(true)
  }, [restriction])

  return (
    <div className="flex size-full">
      {/* brand assets section */}
      <div className="fixed z-20 h-[calc(100%-64px-20px)] w-[320px] bg-background px-5 md:w-[360px] lg:w-[440px] xl:w-[480px] 2xl:w-[770px]">
        <BrandAssets
          isLoading={isLoading}
          imagePreviewUrls={imagePreviewUrls}
          onRemoveBrandAsset={removeBrandAsset}
          onChangeBrandAssets={handleChangeBrandAssets}
        />
      </div>

      {/* generate section */}
      <div className="ml-[320px] h-full grow md:ml-[360px] lg:ml-[460px] xl:ml-[500px] 2xl:ml-[790px]">
        <div className="flex h-full gap-5 overflow-x-auto lg:gap-10">
          {/* generate section - left */}
          <section className="shrink-0 grow basis-[400px] overflow-y-auto overflow-x-hidden">
            <div className="relative flex h-full flex-col">
              <div>
                <h2 className="inline-block text-[1.25rem] font-semibold lg:text-[1.5rem] 2xl:text-[2rem]">
                  Generate
                </h2>

                <span className="absolute right-0 top-0">
                  <NewGenerateButton
                    disabled={isLoading}
                    onErrorGenerate={() => setOpenToast(true)}
                    isHoldingGenerate={isHoldingGenerate}
                    onHoldingGenerate={onHoldingGenerate}
                  />
                </span>
              </div>

              <div className="mt-5 grow">
                <div className="flex h-full grow flex-col gap-5">
                  {/* image editing section */}
                  <div className="relative min-h-[391px] grow xl:min-h-[640px]">
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
                  {props.isGettingToken ? (
                    // TODO: add skeleton loader
                    'getting token ...'
                  ) : (
                    <Variations
                      isLoading={isLoading}
                      onDataLoaded={() => setIsLoading(false)}
                      onChangeSelectedVariation={handleSelectedVariation}
                      onErrorGenerate={() => setOpenToast(true)}
                      onHoldingGenerate={onHoldingGenerate}
                    />
                  )}
                </div>
              </div>
            </div>
          </section>

          {/* generate section - right */}
          <div className="shrink-0 basis-[340px] overflow-y-auto overflow-x-hidden md:basis-[360px] lg:basis-[440px] xl:basis-[480px] 2xl:basis-[770px]">
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
