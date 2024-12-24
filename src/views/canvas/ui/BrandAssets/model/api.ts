import { dtsAxios } from '@/shared/api'

import { AxiosResponse } from 'axios'

import { URL_BRAND_ASSETS_SEARCH, URL_BRAND_ASSETS_UPLOAD } from './constants'
import {
  SearchBrandAssetsReqData,
  SearchBrandAssetsResData,
  UploadBrandAssetResData
} from './types'

// constants로 파일명 수정

export const searchBrandAssets = async () => {
  try {
    const response = await dtsAxios.get<
      SearchBrandAssetsReqData,
      AxiosResponse<SearchBrandAssetsResData>
    >(URL_BRAND_ASSETS_SEARCH, {
      params: {
        assetType: 'BRAND'
      }
    })
    console.log('Search response:', response)
    return response.data
  } catch (error) {
    console.error('Search error:', error)
    throw error
  }
}

export const uploadBrandAsset = async (file: File) => {
  const formData = new FormData()
  formData.append('file', file)

  try {
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
    console.log('Upload response:', response)
    return response.data
  } catch (error) {
    console.error('Upload error:', error)
    throw error
  }
}
