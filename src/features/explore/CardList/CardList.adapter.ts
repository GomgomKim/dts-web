import { getExploreImages } from '@/features/explore/CardList/CardList.api'
import { useInfiniteQuery } from '@tanstack/react-query'

const useGetExploreImages = (tagType: string, scrollKey: string | null) => {
  const {
    data,
    status,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isPending,
    isLoading, // isPending && isFetching
    isError
  } = useInfiniteQuery({
    queryKey: ['explore', tagType, scrollKey],
    queryFn: ({ pageParam }) =>
      getExploreImages({ tagType, scrollKey: pageParam }),
    initialPageParam: null || '',
    getNextPageParam: (lastPage) => lastPage.content.scrollKey
    // staleTime: 60 * 1000,
    // gcTime: 300 * 1000,
  })

  console.log('data', data)

  return {
    data,
    status,
    hasNextPage,
    fetchNextPage,
    isFetching,
    isPending,
    isLoading,
    isError
  }
}

export { useGetExploreImages }
