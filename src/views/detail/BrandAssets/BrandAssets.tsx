'use client'

import * as React from 'react'
import { ImageInputBox } from '@/features/detail/ui/ImageInputBox'
import { Button } from '@/shared/ui/button'
interface BrandAssetsProps {
  handleRemoveBox: (boxId: string) => void
  handleAddBrandAssets: () => void
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
      {/* <div className="flex flex-col">
              <Button variant="outline">Remove Background</Button> */}
      <Button
        onClick={props.handleAddBrandAssets}
        disabled={props.assetDisabled}
      >
        Add Brand Assets
      </Button>
      {/* </div> */}
    </section>
  )
}
