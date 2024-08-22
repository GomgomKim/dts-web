import { useMutation, useQueryClient } from '@tanstack/react-query'
import { DeleteFavoriteRemoveReqData } from '@/entities/LikeButton/model'
import { deleteFavoriteRemove } from '@/entities/LikeButton/api'
import { useSearchParams } from 'next/navigation'
import { GetFavoriteListResData } from '../FavoriteList/model'

const useDeleteFavoriteRemove = () => {
  const queryClient = useQueryClient()

  const searchParams = useSearchParams()
  const tagType = searchParams.get('tagType')
  const queryKey = ['favorites', tagType]

  return useMutation({
    mutationFn: ({ encodedBaseImageId }: DeleteFavoriteRemoveReqData) =>
      deleteFavoriteRemove({ encodedBaseImageId }),
    onMutate: async ({ encodedBaseImageId }) => {
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
                  (item) => item.encodedBaseImageId !== encodedBaseImageId
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
      queryClient.invalidateQueries({ queryKey: queryKey })
    }
  })
}

export { useDeleteFavoriteRemove }
