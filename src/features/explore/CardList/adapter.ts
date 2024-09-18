import { getExploreList } from '@/features/explore/CardList/api'
import { InfiniteData, useInfiniteQuery } from '@tanstack/react-query'
import { GetExploreListResData } from './types'
import { useSearchParams } from 'next/navigation'
import { useFilterTypeStore } from '@/shared/lib/stores/useFilterTypeStore'
import { FILTER_TYPES } from './constant'

export const useGetExploreList = () => {
  // TODO: filtertype 값 밖에서 주입
  const searchParams = useSearchParams()

  const previousFilterType = useFilterTypeStore((state) => state.filterType)

  const filterType =
    searchParams.get('filterType') || previousFilterType || FILTER_TYPES[0]

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
    enabled: !!filterType,
    initialPageParam: null,
    getNextPageParam: (lastPage) => lastPage.content.scrollKey
    // staleTime: 60 * 1000,
    // gcTime: 300 * 1000,
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
