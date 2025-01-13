import { Asset, AssetType } from '@/shared/api/types'

import { useSuspenseQuery } from '@tanstack/react-query'

import { getAssets } from './api'
import { GetAssetItemsResponse } from './types'

export const useGetAssetItems = (assetType: AssetType) => {
  return useSuspenseQuery<
    GetAssetItemsResponse,
    Error,
    Asset[],
    [_1: string, _2: string]
  >({
    queryKey: ['assets', assetType],
    queryFn: () => getAssets(assetType),
    select: (data) => data.content.assets,
    staleTime: 60 * 1000,
    gcTime: 300 * 1000
  })
}
