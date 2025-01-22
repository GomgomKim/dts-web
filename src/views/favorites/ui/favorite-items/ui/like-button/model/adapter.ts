import { useSearchParams } from 'next/navigation'

import { ORDER_TYPES_MAP } from '@/views/favorites/ui/order-dropdown/constant'

import { deleteFavorite } from '@/entities/like-button/model/api'
import { DeleteFavoriteReqData } from '@/entities/like-button/model/types'

import { useMutation, useQueryClient } from '@tanstack/react-query'

import { GetFavoriteListResData } from '../../../model/types'

export const useDeleteFavorite = () => {
  const queryClient = useQueryClient()

  const searchParams = useSearchParams()
  const orderType =
    searchParams.get('order') || Object.values(ORDER_TYPES_MAP)[0]
  const queryKey = ['favorites', orderType]

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
                images: page.content.data.filter(
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
