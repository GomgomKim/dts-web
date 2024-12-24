import { dtsAxios } from '@/shared/api'

import { AxiosError, AxiosResponse } from 'axios'

import { URL_BRAND_ASSETS_SEARCH, URL_BRAND_ASSETS_UPLOAD } from './constants'
import {
  SearchBrandAssetsReqData,
  SearchBrandAssetsResData,
  UploadBrandAssetResData
} from './types'

export const searchBrandAssets = async () => {
  const response = await dtsAxios.get<
    SearchBrandAssetsReqData,
    AxiosResponse<SearchBrandAssetsResData, AxiosError>
  >(URL_BRAND_ASSETS_SEARCH, {
    params: {
      assetType: 'BRAND'
    }
  })
  return response.data
}

export const uploadBrandAsset = async (file: File) => {
  const formData = new FormData()
  formData.append('file', file)

  const response = await dtsAxios.post<
    FormData,
    AxiosResponse<UploadBrandAssetResData>
  >(URL_BRAND_ASSETS_UPLOAD, formData, {
    params: {
      assetType: 'BRAND'
    },
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
  return response.data
}
