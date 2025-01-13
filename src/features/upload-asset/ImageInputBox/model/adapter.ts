import { PostAssetRequest } from '@/features/upload-asset/ImageInputBox/model/types'

import { AssetType } from '@/shared/api/types'

import { useMutation } from '@tanstack/react-query'

import { postBrandAsset } from './api'

export const usePostAsset = () => {
  return useMutation({
    mutationFn: ({
      asset,
      assetType
    }: PostAssetRequest & { assetType: AssetType }) =>
      postBrandAsset(asset, assetType)
  })
}
