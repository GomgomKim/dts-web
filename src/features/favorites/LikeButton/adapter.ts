import { useMutation, useQueryClient } from '@tanstack/react-query'
import { DeleteFavoriteReqData } from '@/entities/LikeButton/types'
import { deleteFavoriteRemove } from '@/entities/LikeButton/api'
import { useSearchParams } from 'next/navigation'
import { GetFavoriteListResData } from '../FavoriteList/model'
import { FILTER_TYPES } from '../FavoriteList/constant'
import { SORTING_TYPES } from '../SortDropdown'

const useDeleteFavoriteRemove = () => {
  const queryClient = useQueryClient()

  const searchParams = useSearchParams()
  const filterType = searchParams.get('filterType') || FILTER_TYPES[0]
  const sortingType = searchParams.get('sortingType') || SORTING_TYPES[0]
  const queryKey = ['favorites', filterType, sortingType]

  return useMutation({
    mutationFn: ({ encodedImageInfoId }: DeleteFavoriteReqData) =>
      deleteFavoriteRemove({ encodedImageInfoId }),
    onMutate: async ({ encodedImageInfoId }) => {
      await queryClient.cancelQueries({
        queryKey: queryKey
      })

      const previousData = queryClient.getQueryData<{
        pages: GetFavoriteListResData[]
        pageParams: string[]
      }>(queryKey)

      queryClient.setQueryData(
        queryKey,
        (oldData: typeof previousData | undefined) => {
          if (!oldData) return oldData

          return {
            ...oldData,
            pages: oldData.pages.map((page) => ({
              ...page,
              content: {
                ...page.content,
                images: page.content.images.filter(
                  (item) => item.encodedImageInfoId !== encodedImageInfoId
                )
              }
            }))
          }
        }
      )

      return { previousData }
    },
    onError: (error, _variables, context) => {
      queryClient.setQueryData(queryKey, context?.previousData)
      console.log('failed to delete favorite')
      console.error(error)
    }
    // onSettled: () => {
    //   queryClient.invalidateQueries({ queryKey: queryKey })
    // }
  })
}

export { useDeleteFavoriteRemove }
