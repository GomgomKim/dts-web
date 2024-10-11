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
  const { imagePreviewUrls } = useImagePreviewUrlStore()

  const debounceHandleClickAddBrandAssets = React.useCallback(
    debounce(props.onClickAddBrandAssets, DELAY_ADD_BRAND_ASSETS),
    []
  )

  return (
    <section className="sticky flex flex-col gap-5 h-full">
      <h2 className="text-[1.25rem] min-[1512px]:text-[1.5rem] min-[3840px]:text-[2rem] font-semibold">
        Brand Assets
      </h2>
      <div className="grow">
        <h3 className="mb-3 text-neutral-7 text-[0.875rem] min-[3840px]:text-[1.25rem]">
          Product
        </h3>
        <ImageInputBox
          disabled={props.isLoading}
          boxId="product"
          onChangeBrandAsset={() => props.onChangeBrandAsset('product')}
        />
      </div>
      <div className="grow">
        <h3 className="mb-3 text-neutral-7 text-[0.875rem] min-[3840px]:text-[1.25rem]">
          Brand Logo
        </h3>
        <ImageInputBox
          disabled={props.isLoading}
          boxId="logo"
          onChangeBrandAsset={() => props.onChangeBrandAsset('logo')}
        />
      </div>
      <Button
        onClick={debounceHandleClickAddBrandAssets}
        disabled={imagePreviewUrls.size < 1}
        className="disabled:bg-neutral-2 disabled:text-neutral-4 disabled:opacity-1"
      >
        Add Brand Assets
      </Button>
    </section>
  )
}
