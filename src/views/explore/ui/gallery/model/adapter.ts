import { usePathname, useSearchParams } from 'next/navigation'

import { useTagTypeStore } from '@/features/filter-tag-types/model/useTagTypeStore'

import { InfiniteData, useInfiniteQuery } from '@tanstack/react-query'

import { TAG_TYPES } from '../constant'
import { getExploreList } from './api'
import { GetExploreListResData } from './types'

export const useGetExploreList = () => {
  const searchParams = useSearchParams()
  const pathname = usePathname()

  const previousTagType = useTagTypeStore((state) => state.tagType)

  const tagType =
    pathname !== '/explore'
      ? previousTagType
      : searchParams.get('tagType') || TAG_TYPES[0]

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
      getExploreList({ tagType, scrollKey: pageParam }),
    initialPageParam: null,
    getNextPageParam: (lastPage) => lastPage.content.scrollKey,
    staleTime: 60 * 1000,
    gcTime: 300 * 1000,
    throwOnError: true
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
