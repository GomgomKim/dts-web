'use client'

import * as React from 'react'

import { ImageInputBox } from './ui/ImageInputBox'

interface BrandAssetsProps {
  isLoading: boolean
  imagePreviewUrls: Map<string, string>
  onRemoveBrandAsset: (boxId: string) => void
  onChangeBrandAssets: (boxId: string, previewImgSrc: string) => void
}

export const BrandAssets = (props: BrandAssetsProps) => {
  return (
    <section className="sticky flex h-full flex-col gap-5">
      <h2 className="text-[1.25rem] font-semibold lg:text-[1.5rem] 2xl:text-[2rem]">
        Brand Assets
      </h2>
      <div className="h-[calc(50%-(60px+29px)/2)] grow 2xl:h-[calc(50%-(60px+38px)/2)]">
        <h3 className="mb-3 text-[0.875rem] leading-[17px] text-neutral-7 2xl:text-[1.25rem] 2xl:leading-[24px]">
          Product
        </h3>
        <ImageInputBox
          disabled={props.isLoading}
          boxId="product"
          imagePreviewUrl={props.imagePreviewUrls.get('product')}
          onRemoveBrandAsset={() => props.onRemoveBrandAsset('product')}
          onChangeBrandAssets={(previewImgSrc) =>
            props.onChangeBrandAssets('product', previewImgSrc)
          }
        />
      </div>
      <div className="h-[calc(50%-(60px+29px)/2)] grow  2xl:h-[calc(50%-(60px+38px)/2)]">
        <h3 className="mb-3 text-[0.875rem] leading-[17px] text-neutral-7 2xl:text-[1.25rem] 2xl:leading-[24px]">
          Brand Logo
        </h3>
        <ImageInputBox
          disabled={props.isLoading}
          boxId="logo"
          imagePreviewUrl={props.imagePreviewUrls.get('logo')}
          onRemoveBrandAsset={() => props.onRemoveBrandAsset('logo')}
          onChangeBrandAssets={(previewImgSrc) =>
            props.onChangeBrandAssets('logo', previewImgSrc)
          }
        />
      </div>
    </section>
  )
}
