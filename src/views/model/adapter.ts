import { getVariationImages } from './api'
import { GetVariationListResData, Variation } from './model'
import { useQuery } from '@tanstack/react-query'

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

export { useGetVariationImages }
