import { InfiniteData, useInfiniteQuery } from '@tanstack/react-query'
import { getFavoriteList } from './api'
import { GetFavoriteListResData } from './model'

const useGetFavoriteList = (tagType: string) => {
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
    queryKey: ['favorites', tagType],
    queryFn: ({ pageParam }) =>
      getFavoriteList({ tagType, scrollKey: pageParam }),
    enabled: !!tagType,
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

export { useGetFavoriteList }
