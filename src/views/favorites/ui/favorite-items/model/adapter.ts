import { useSearchParams } from 'next/navigation'

import { useAuthStore } from '@/entities/user-profile/model/store'

import { InfiniteData, useInfiniteQuery } from '@tanstack/react-query'

import { SORTING_TYPES } from '../../sort-dropdown/constant'
import { getFavoriteList } from './api'
import { GetFavoriteListResData } from './types'

export const useGetFavoriteList = () => {
  const searchParams = useSearchParams()
  const isAuth = useAuthStore((state) => state.isAuth)
  const token = useAuthStore((state) => state.tokens)

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
    [_1: string, _2: string],
    string | null
  >({
    queryKey: ['favorites', sortingType],
    queryFn: ({ pageParam }) =>
      getFavoriteList({ sortingType, scrollKey: pageParam }),
    enabled: isAuth === true && token !== null && !!sortingType,
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
