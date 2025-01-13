import { dtsAxios } from '@/shared/api'

import { URL_ASSETS_SEARCH } from './constants'
import { GetAssetItemsResponse } from './types'

export const getAssets = async (assetType: string) => {
  // try {
  const response = await dtsAxios.get<GetAssetItemsResponse>(
    URL_ASSETS_SEARCH,
    {
      params: { assetType }
    }
  )
  return response.data
  // } catch (error) {
  //   throw new Error()
  // }
}
