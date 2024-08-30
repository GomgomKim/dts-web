import {
  getAiImageProgress,
  getVariationImages,
  postAiImageGenerate,
  postAssetRemoveBackground
} from './api'
import {
  GetAiImageProgressReqData,
  GetVariationListResData,
  VariationListContent,
  PostAiImageReqData,
  PostAssetRemoveBackgroundReqData
} from './model'
import { useMutation, useQuery, useSuspenseQuery } from '@tanstack/react-query'

const useGetVariationImages = (encodedBaseImageInfoId: string) => {
  const { data, status, error, isFetching } = useSuspenseQuery<
    GetVariationListResData,
    Error,
    VariationListContent
  >({
    queryKey: ['archive', 'variation', encodedBaseImageInfoId],
    queryFn: () => getVariationImages({ encodedBaseImageInfoId }),
    select: (data) => data.content
  })

  return {
    data,
    status,
    error,
    isFetching
  }
}

const usePostAiImageGenerate = () => {
  return useMutation({
    mutationFn: ({ encodedBaseImageId, properties }: PostAiImageReqData) =>
      postAiImageGenerate({ encodedBaseImageId, properties })
  })
}

type useGetAiImageProgressProps = GetAiImageProgressReqData & {
  variationId: string
}
const useGetAiImageProgress = ({
  variationId,
  encodedGenerateId
}: useGetAiImageProgressProps) => {
  return useQuery({
    queryKey: [
      'archive',
      variationId,
      'aiImage',
      'progress',
      encodedGenerateId
    ],
    queryFn: () => getAiImageProgress({ encodedGenerateId }),
    select: (data) => data.content.progress,
    enabled: !!encodedGenerateId,
    refetchInterval: (query) => {
      console.log('useGetAiImageProgress', query.state.data?.content.progress)
      return query.state.data?.content.progress === 100 ? false : 3000
    }
  })
}

const usePostAssetRemoveBackground = () => {
  return useMutation({
    mutationFn: ({ source }: PostAssetRemoveBackgroundReqData) =>
      postAssetRemoveBackground({ source })
  })
}

export {
  useGetVariationImages,
  usePostAiImageGenerate,
  useGetAiImageProgress,
  usePostAssetRemoveBackground
}
