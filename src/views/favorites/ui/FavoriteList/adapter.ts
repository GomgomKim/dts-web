import { useSearchParams } from 'next/navigation'
import { InfiniteData, useInfiniteQuery } from '@tanstack/react-query'
import { getFavoriteList } from './api'
import { GetFavoriteListResData } from './model'
import { FILTER_TYPES } from './constant'
import { SORTING_TYPES } from '../SortDropdown'

export const useGetFavoriteList = () => {
  const searchParams = useSearchParams()

  const filterType = searchParams.get('filterType') || FILTER_TYPES[0]

  const sortingType = searchParams.get('sortingType') || SORTING_TYPES[0]

  const {
    data,
    status,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage
  } = useInfiniteQuery<
    GetFavoriteListResData,
    Error,
    InfiniteData<GetFavoriteListResData>,
    [_1: string, _2: string, _3: string],
    string | null
  >({
    queryKey: ['favorites', filterType, sortingType],
    queryFn: ({ pageParam }) =>
      getFavoriteList({ filterType, sortingType, scrollKey: pageParam }),
    enabled: !!filterType && !!sortingType,
    initialPageParam: null,
    getNextPageParam: (lastPage) => lastPage.content.scrollKey
    // staleTime: 60 * 1000,
    // gcTime: 300 * 1000
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
