import { getExploreImages } from '@/features/explore/CardList/api'
import { InfiniteData, useInfiniteQuery } from '@tanstack/react-query'
import { GetExploreListResData } from './model'

const useGetExploreImages = (tagType: string) => {
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
    queryKey: ['explore', tagType],
    queryFn: ({ pageParam }) =>
      getExploreImages({ tagType, scrollKey: pageParam }),
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

export { useGetExploreImages }
