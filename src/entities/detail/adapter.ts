import { useAiImageGeneratingStore } from '@/features/detail/store'
import {
  getAiImageProgress,
  getVariationList,
  postAiImageGenerate,
  postRemoveBackground
} from './api'
import {
  GetVariationListResData,
  VariationListContent,
  PostAiImageReqData,
  PostRemoveBackgroundReqData,
  GetAiImageProgressResData
} from './types'
import {
  Query,
  useMutation,
  useQueries,
  UseQueryOptions,
  useSuspenseQuery
} from '@tanstack/react-query'
import { AxiosError } from 'axios'

export const useGetVariationList = (encodedBaseImageInfoId: string) => {
  const { data, status, error, isFetching } = useSuspenseQuery<
    GetVariationListResData,
    Error,
    VariationListContent
  >({
    queryKey: ['archive', 'variation', encodedBaseImageInfoId],
    queryFn: () => getVariationList({ encodedBaseImageInfoId }),
    select: (data) => data.content
    // staleTime: 60 * 1000,
    // gcTime: 300 * 1000
  })

  return {
    data,
    status,
    error,
    isFetching
  }
}

export const usePostAiImageGenerate = () => {
  return useMutation({
    mutationFn: ({ encodedBaseImageId, properties }: PostAiImageReqData) =>
      postAiImageGenerate({ encodedBaseImageId, properties })
  })
}

export const useGetAiImageProgress = () => {
  const aiImageGeneratingList = useAiImageGeneratingStore(
    (state) => state.aiImageGeneratingList
  )

  return useQueries<UseQueryOptions<GetAiImageProgressResData, AxiosError>[]>({
    queries: aiImageGeneratingList.map((item) => {
      const { encodedAiBasedImageId, encodedBaseImageId } = item

      return {
        queryKey: [
          'archive',
          encodedAiBasedImageId,
          'aiImage',
          'progress',
          encodedBaseImageId
        ],
        queryFn: async () => {
          const response = await getAiImageProgress({
            encodedImageId: encodedBaseImageId
          })
          if (response instanceof AxiosError || response === undefined) {
            throw new Error('Failed to fetch AI image progress')
          }
          return response
        },
        refetchInterval: (
          query: Query<GetAiImageProgressResData, AxiosError>
        ) => {
          if (
            query.state.data?.content?.variation.isFail === true ||
            query.state.data?.content?.variation.isTimeout === true
          ) {
            return false
          }
          if (query.state.data?.content?.variation.progress === 100) {
            return false
          }
          return 3000
        }
      }
    })
  })
}

export const usePostRemoveBackground = () => {
  return useMutation({
    mutationFn: ({ source }: PostRemoveBackgroundReqData) =>
      postRemoveBackground({ source })
  })
}
