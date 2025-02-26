import { useSearchParams } from 'next/navigation'

import { useAuthStore } from '@/shared/lib/stores/useAuthStore'

import { InfiniteData, useInfiniteQuery } from '@tanstack/react-query'

import { ORDER_TYPES_MAP } from '../../order-dropdown/constant'
import { getFavoriteList } from './api'
import { GetFavoriteListResData } from './types'

export const useGetFavoriteList = () => {
  const searchParams = useSearchParams()
  const isAuth = useAuthStore((state) => state.isAuth)
  const token = useAuthStore((state) => state.tokens)

  const order = searchParams.get('order') || Object.values(ORDER_TYPES_MAP)[0]

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
    queryKey: ['favorites', order],
    queryFn: ({ pageParam }) =>
      getFavoriteList({ order, scrollKey: pageParam }),
    enabled: isAuth === true && token !== null && !!order,
    initialPageParam: null,
    getNextPageParam: (lastPage) => lastPage.content.offset
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
