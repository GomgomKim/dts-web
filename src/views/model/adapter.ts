import {
  getAiImageProgress,
  getVariationImages,
  postAiImageGenerate
} from './api'
import {
  GetAiImageProgressReqData,
  GetVariationListResData,
  PostAiImageReqData,
  Variation
} from './model'
import { useMutation, useQuery } from '@tanstack/react-query'

const useGetVariationImages = (encodedBaseImageId: string) => {
  const { data, status, error, isFetching } = useQuery<
    GetVariationListResData,
    Error,
    Variation[]
  >({
    queryKey: ['archive', 'variation', encodedBaseImageId],
    queryFn: () => getVariationImages({ encodedBaseImageId }),
    enabled: !!encodedBaseImageId,
    select: (data) => data.content.variations
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

export { useGetVariationImages, usePostAiImageGenerate, useGetAiImageProgress }
