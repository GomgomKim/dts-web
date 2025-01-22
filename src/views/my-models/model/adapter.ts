import { useInfiniteQuery } from '@tanstack/react-query'

import { getArchives } from './api'
import { DEFAULT_PAGE_SIZE } from './constants'
import { GetArchivesReqData, GetArchivesResData } from './type'

export const useGetArchives = ({
  sortingType = 'NEWEST',
  mediaType = 'ALL',
  size = DEFAULT_PAGE_SIZE
}: GetArchivesReqData = {}) => {
  return useInfiniteQuery<GetArchivesResData, Error>({
    queryKey: ['archives', sortingType, mediaType],
    queryFn: ({ pageParam }) =>
      getArchives({
        sortingType,
        mediaType,
        size,
        scrollKey: pageParam as string
      }),
    initialPageParam: null,
    getNextPageParam: (lastPage) => lastPage.content.scrollKey,
    staleTime: 60 * 1000,
    gcTime: 300 * 1000
  })
}
