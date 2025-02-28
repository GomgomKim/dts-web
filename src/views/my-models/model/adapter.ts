import { useInfiniteQuery } from '@tanstack/react-query'

import { getArchives } from './api'
import { DEFAULT_PAGE_SIZE } from './constants'
import { GetArchivesReqData, GetArchivesResData } from './type'

export const useGetArchives = ({
  sortingType = 'NEWEST',
  size = DEFAULT_PAGE_SIZE
}: GetArchivesReqData = {}) => {
  return useInfiniteQuery<GetArchivesResData, Error>({
    queryKey: ['archives', sortingType],
    queryFn: ({ pageParam }) =>
      getArchives({
        sortingType,
        size,
        offset: pageParam as string
      }),
    initialPageParam: null,
    getNextPageParam: (lastPage) => lastPage.content.offset
    // staleTime: 60 * 1000,
    // gcTime: 300 * 1000
  })
}
