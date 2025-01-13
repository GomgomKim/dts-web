import { dtsAxios } from '@/shared/api'
import { AssetType } from '@/shared/api/types'

import { AxiosError, AxiosResponse } from 'axios'

import { URL_ASSET_UPLOAD } from './constants'
import { PostAssetRequest, PostAssetResponse } from './types'

export const postBrandAsset = async (asset: FormData, assetType: AssetType) => {
  const response = await dtsAxios.post<
    PostAssetRequest & { assetType: AssetType },
    AxiosResponse<PostAssetResponse, AxiosError>
  >(URL_ASSET_UPLOAD, asset, {
    params: {
      assetType
    },
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
  return response
}
