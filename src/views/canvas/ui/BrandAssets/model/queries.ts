import { useQuery } from '@tanstack/react-query'

import { searchBrandAssets } from './api'

export const useBrandAssetsQuery = () => {
  return useQuery({
    queryKey: ['brandAssets'],
    queryFn: async () => {
      const response = await searchBrandAssets()
      console.log('Brand Assets API Response:', response)
      return response
    }
  })
}
