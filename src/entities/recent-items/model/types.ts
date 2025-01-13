import { StaticImageData } from 'next/image'

import { Asset, AssetType, ResData } from '@/shared/api/types'

export interface GetAssetItemsResponse
  extends ResData<{
    assets: Asset[]
  }> {}

export interface DummyData {
  id: string
  name?: string
  src: string | StaticImageData
  assetType: AssetType
}
