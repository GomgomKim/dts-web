'use client'

import * as React from 'react'

import { ImageInputBox } from './ui/ImageInputBox'

interface BrandAssetsProps {
  isLoading: boolean
  onRemoveBrandAsset: (boxId: string) => void
  onChangeBrandAssets: (boxId: string, previewImgSrc: string) => void
}

export const BrandAssets = (props: BrandAssetsProps) => {
  return (
    <section className="sticky flex flex-col gap-5 h-full">
      <h2 className="text-[1.25rem] lg:text-[1.5rem] 2xl:text-[2rem] font-semibold">
        Brand Assets
      </h2>
      <div className="grow-[1] h-[calc(50%-(60px+29px)/2)] 2xl:h-[calc(50%-(60px+38px)/2)]">
        <h3 className="mb-3 text-neutral-7 text-[0.875rem] 2xl:text-[1.25rem] leading-[17px] 2xl:leading-[24px]">
          Product
        </h3>
        <ImageInputBox
          disabled={props.isLoading}
          boxId="product"
          onRemoveBrandAsset={() => props.onRemoveBrandAsset('product')}
          onChangeBrandAssets={(previewImgSrc) =>
            props.onChangeBrandAssets('product', previewImgSrc)
          }
        />
      </div>
      <div className="grow-[1] h-[calc(50%-(60px+29px)/2)]  2xl:h-[calc(50%-(60px+38px)/2)]">
        <h3 className="mb-3 text-neutral-7 text-[0.875rem] 2xl:text-[1.25rem] leading-[17px] 2xl:leading-[24px]">
          Brand Logo
        </h3>
        <ImageInputBox
          disabled={props.isLoading}
          boxId="logo"
          onRemoveBrandAsset={() => props.onRemoveBrandAsset('logo')}
          onChangeBrandAssets={(previewImgSrc) =>
            props.onChangeBrandAssets('logo', previewImgSrc)
          }
        />
      </div>
    </section>
  )
}
