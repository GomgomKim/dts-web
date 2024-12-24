'use client'

import { useUploadBrandAssetMutation } from './model/mutations'
import { useBrandAssetsQuery } from './model/queries'
import { ImageInputBox } from './ui/ImageInputBox'

interface BrandAssetsProps {
  isLoading: boolean
  imagePreviewUrls?: Map<string, string>
  onRemoveBrandAsset: (boxId: string) => void
  onChangeBrandAssets: (boxId: string, file: File) => void
}

export const BrandAssets = (props: BrandAssetsProps) => {
  const { isLoading: isLoadingAssets } = useBrandAssetsQuery()
  const { mutate: uploadAsset, isPending: isUploading } =
    useUploadBrandAssetMutation()

  const handleFileChange = async (boxId: string, file: File) => {
    try {
      uploadAsset(file, {
        onSuccess: () => {
          // 업로드 성공 시 미리보기 URL 업데이트
          // props.onChangeBrandAssets(boxId, data.content.assetUrl)
        }
      })
    } catch (error) {
      console.error('Failed to upload brand asset:', error)
    }
  }

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
          disabled={props.isLoading || isLoadingAssets || isUploading}
          boxId="product"
          onRemoveBrandAsset={() => props.onRemoveBrandAsset('product')}
          onChangeBrandAssets={(file: File) =>
            handleFileChange('product', file)
          }
        />
      </div>
      <div className="h-[calc(50%-(60px+29px)/2)] grow  2xl:h-[calc(50%-(60px+38px)/2)]">
        <h3 className="mb-3 text-[0.875rem] leading-[17px] text-neutral-7 2xl:text-[1.25rem] 2xl:leading-[24px]">
          Brand Logo
        </h3>
        <ImageInputBox
          disabled={props.isLoading || isLoadingAssets || isUploading}
          boxId="logo"
          onRemoveBrandAsset={() => props.onRemoveBrandAsset('logo')}
          onChangeBrandAssets={(file: File) => handleFileChange('logo', file)}
        />
      </div>
    </section>
  )
}
