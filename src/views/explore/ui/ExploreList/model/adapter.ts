import { usePathname, useSearchParams } from 'next/navigation'

import { useFilterTypeStore } from '@/shared/lib/stores/useFilterTypeStore'

import { InfiniteData, useInfiniteQuery } from '@tanstack/react-query'

import { FILTER_TYPES } from '../constant'
import { getExploreList } from './api'
import { GetExploreListResData } from './types'

export const useGetExploreList = () => {
  const searchParams = useSearchParams()
  const pathname = usePathname()

  const previousFilterType = useFilterTypeStore((state) => state.filterType)

  const filterType =
    pathname !== '/explore'
      ? previousFilterType
      : searchParams.get('filterType') || FILTER_TYPES[0]

  const {
    data,
    status,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage
  } = useInfiniteQuery<
    GetExploreListResData,
    Error,
    InfiniteData<GetExploreListResData>,
    [_1: string, _2: string],
    string | null
  >({
    queryKey: ['explore', filterType],
    queryFn: ({ pageParam }) =>
      getExploreList({ filterType, scrollKey: pageParam }),
    initialPageParam: null,
    getNextPageParam: (lastPage) => lastPage.content.scrollKey,
    staleTime: 60 * 1000,
    gcTime: 300 * 1000
  })

  return {
    data,
    status,
    error,
    hasNextPage,
    fetchNextPage,
    isFetching,
    isFetchingNextPage
  }
}
