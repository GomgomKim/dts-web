import { InfiniteData, useInfiniteQuery } from '@tanstack/react-query'
import { getFavoriteList } from './api'
import { GetFavoriteListResData } from './model'

// TODO: type 수정
const useGetFavoriteList = ({
  filterType,
  sortingType = 'OLDEST'
}: {
  filterType: string
  sortingType?: string
}) => {
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
    enabled: !!filterType,
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

export { useGetFavoriteList }
