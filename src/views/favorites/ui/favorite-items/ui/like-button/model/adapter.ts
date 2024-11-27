import { useSearchParams } from 'next/navigation'

import { deleteFavorite } from '@/entities/like-button/model/api'
import { DeleteFavoriteReqData } from '@/entities/like-button/model/types'

import { useMutation, useQueryClient } from '@tanstack/react-query'

import { SORTING_TYPES } from '../../../../sort-dropdown/constant'
import { GetFavoriteListResData } from '../../../model/types'

export const useDeleteFavorite = () => {
  const queryClient = useQueryClient()

  const searchParams = useSearchParams()
  const sortingType = searchParams.get('sortingType') || SORTING_TYPES[0]
  const queryKey = ['favorites', sortingType]

  return useMutation({
    mutationFn: ({ mainImageId }: DeleteFavoriteReqData) =>
      deleteFavorite({ mainImageId }),
    onMutate: async ({ mainImageId }) => {
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
                  (item) => item.id.toString() !== mainImageId
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
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['explore'] })
    }
  })
}
