import { Asset, ResData } from '@/shared/api/types'

export interface PostAssetRequest {
  asset: FormData
}

export interface PostAssetResponse
  extends ResData<{
    asset: Asset
  }> {}
