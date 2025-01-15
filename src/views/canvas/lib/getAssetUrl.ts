import { DummyData } from '@/entities/recent-items/model/types'

import { URL_BASE_IMAGE_FILE } from '@/shared/api/constants'
import { Asset } from '@/shared/api/types'

export const getAssetUrl = (item: DummyData | Asset) => {
  if ('src' in item) {
    return item.src
  }
  return process.env.NEXT_PUBLIC_API_MOCKING === 'enabled'
    ? item.encryptedAssetUrl
    : process.env.NEXT_PUBLIC_API_URL +
        URL_BASE_IMAGE_FILE +
        encodeURIComponent(item.encryptedAssetUrl)
}
