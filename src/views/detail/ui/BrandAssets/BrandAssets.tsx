'use client'

import * as React from 'react'

import { useImagePreviewUrlStore } from '@/entities/detail/store'

import { debounce } from '@/shared/lib/utils'
import { Button } from '@/shared/ui/button'

import { ImageInputBox } from './ui/ImageInputBox'

const DELAY_ADD_BRAND_ASSETS = 300

interface BrandAssetsProps {
  isLoading: boolean
  onChangeBrandAsset: (boxId: string) => void
  onClickAddBrandAssets: () => void
}

export const BrandAssets = (props: BrandAssetsProps) => {
  const btnRef = React.useRef<HTMLButtonElement | null>(null)
  const { imagePreviewUrls } = useImagePreviewUrlStore()

  const toggleButton = (disabled: boolean) => {
    if (btnRef.current === null) return
    btnRef.current.disabled = disabled
  }

  const handleChangeBrandAsset = (boxId: string) => {
    toggleButton(false)
    props.onChangeBrandAsset(boxId)
  }

  const debounceHandleClickAddBrandAssets = React.useCallback(
    debounce(props.onClickAddBrandAssets, DELAY_ADD_BRAND_ASSETS),
    []
  )

  const handleClickAddBrandAssets = () => {
    toggleButton(true)
    debounceHandleClickAddBrandAssets()
  }

  return (
    <section className="sticky flex flex-col gap-5 h-full">
      <h2 className="text-[1.25rem] min-[1512px]:text-[1.5rem] min-[3840px]:text-[2rem] font-semibold">
        Brand Assets
      </h2>
      <div className="grow-[1] max-h-[calc(50%-(60px-40px-29px)/2)] min-[3840px]:max-h-[calc(50%-(60px-40px-38px)/2)]">
        <h3 className="mb-3 text-neutral-7 text-[0.875rem] min-[3840px]:text-[1.25rem] leading-[17px] min-[3840px]:leading-[24px]">
          Product
        </h3>
        <ImageInputBox
          disabled={props.isLoading}
          boxId="product"
          onChangeBrandAsset={() => handleChangeBrandAsset('product')}
          onRemoveBrandAsset={() => props.onChangeBrandAsset('product')}
        />
      </div>
      <div className="grow-[1] max-h-[calc(50%-(60px+40px+29px)/2)]  min-[3840px]:max-h-[calc(50%-(60px+80px+38px)/2)]">
        <h3 className="mb-3 text-neutral-7 text-[0.875rem] min-[3840px]:text-[1.25rem] leading-[17px] min-[3840px]:leading-[24px]">
          Brand Logo
        </h3>
        <ImageInputBox
          disabled={props.isLoading}
          boxId="logo"
          onChangeBrandAsset={() => handleChangeBrandAsset('logo')}
          onRemoveBrandAsset={() => props.onChangeBrandAsset('logo')}
        />
      </div>
      <Button
        ref={btnRef}
        onClick={handleClickAddBrandAssets}
        disabled={imagePreviewUrls.size < 1}
        className="disabled:bg-neutral-2 disabled:text-neutral-4 disabled:opacity-1 min-[3840px]:text-[1.5rem] min-[3840px]:h-[80px]"
      >
        Add Brand Assets
      </Button>
    </section>
  )
}
