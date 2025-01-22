import { useQuery } from '@tanstack/react-query'

import { getContentByModel } from './api'
import { GetContentByModelResData } from './types'

export const useGetContentByModel = (modelId: number) => {
  const { data, status, error, isLoading, isError, isFetching } = useQuery<
    GetContentByModelResData,
    Error
  >({
    queryKey: ['contentByModel', modelId],
    queryFn: () => getContentByModel({ modelId }),
    staleTime: 60 * 1000,
    gcTime: 300 * 1000,
    enabled: !!modelId
  })

  return { data, status, error, isLoading, isError, isFetching }
}
