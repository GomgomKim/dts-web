import { useAiImageGeneratingStore } from '@/entities/generate/store'

import {
  Query,
  UseQueryOptions,
  useQueries,
  useSuspenseQuery
} from '@tanstack/react-query'
import { AxiosError } from 'axios'

import { getAiImageProgress, getVariationList } from './api'
import {
  GetAiImageProgressResData,
  GetVariationListResData,
  VariationListContent
} from './types'

export const useGetVariationList = (mainImageId: string) => {
  return useSuspenseQuery<GetVariationListResData, Error, VariationListContent>(
    {
      queryKey: ['generate', mainImageId, 'variations'],
      queryFn: () => getVariationList({ mainImageId }),
      select: (data) => data.content
      // staleTime: 60 * 1000,
      // gcTime: 300 * 1000
    }
  )
}

export const useGetAiImageProgress = (mainImageId: string) => {
  const aiImageGeneratingList = useAiImageGeneratingStore(
    (state) => state.aiImageGeneratingList
  )

  return useQueries<UseQueryOptions<GetAiImageProgressResData, AxiosError>[]>({
    queries: aiImageGeneratingList.map((item) => {
      const { variationId } = item

      return {
        queryKey: ['generate', mainImageId, 'aiImage', 'progress', variationId],
        queryFn: async () => {
          const response = await getAiImageProgress({
            variationImageId: variationId
          })
          if (response instanceof AxiosError || response === undefined) {
            throw new Error('Failed to fetch AI image progress')
          }
          return response
        },
        refetchInterval: (
          query: Query<GetAiImageProgressResData, AxiosError>
        ) => {
          if (query.state.data?.content?.variation.progress === 100) {
            return false
          }
          return 3000
        }
      }
    })
  })
}
