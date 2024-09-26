'use client'

import * as React from 'react'

import { Button } from '@/shared/ui/button'

import { ImageInputBox } from './ui/ImageInputBox'

interface BrandAssetsProps {
  handleRemoveBox: (boxId: string) => void
  onClickAddBrandAssets: () => void
  assetDisabled: boolean
}

export const BrandAssets = (props: BrandAssetsProps) => {
  return (
    <section className="sticky flex flex-col gap-5">
      <h2 className="text-[1.25rem] ">Brand Assets</h2>
      <div>
        <h3 className="mb-3 text-neutral-7">Product</h3>
        <ImageInputBox
          boxId="product"
          onChangeBrandAsset={() => props.handleRemoveBox('product')}
        />
      </div>
      <div>
        <h3 className="mb-3 text-neutral-7">Brand Logo</h3>
        <ImageInputBox
          boxId="logo"
          onChangeBrandAsset={() => props.handleRemoveBox('logo')}
        />
      </div>
      <Button
        onClick={props.onClickAddBrandAssets}
        disabled={props.assetDisabled}
      >
        Add Brand Assets
      </Button>
    </section>
  )
}
