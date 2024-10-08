'use client'

import * as React from 'react'

import { useImagePreviewUrlStore } from '@/entities/detail/store'

import { debounce } from '@/shared/lib/utils'
import { Button } from '@/shared/ui/button'

import { ImageInputBox } from './ui/ImageInputBox'

const DELAY_ADD_BRAND_ASSETS = 300

interface BrandAssetsProps {
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
    <section className="sticky flex flex-col gap-5">
      <h2 className="text-[1.25rem] ">Brand Assets</h2>
      <div>
        <h3 className="mb-3 text-neutral-7">Product</h3>
        <ImageInputBox
          boxId="product"
          onChangeBrandAsset={() => props.onChangeBrandAsset('product')}
        />
      </div>
      <div>
        <h3 className="mb-3 text-neutral-7">Brand Logo</h3>
        <ImageInputBox
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
