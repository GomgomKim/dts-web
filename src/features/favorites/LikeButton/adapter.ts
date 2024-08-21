import { useMutation, useQueryClient } from '@tanstack/react-query'
import {
  DeleteFavoriteRemoveReqData,
  PostFavoriteAddReqData
} from '@/entities/LikeButton/model'
import {
  deleteFavoriteRemove,
  postFavoriteAdd
} from '@/entities/LikeButton/api'

const usePostFavoriteAdd = () => {
  return useMutation({
    mutationFn: ({ encodedBaseImageId }: PostFavoriteAddReqData) =>
      postFavoriteAdd({ encodedBaseImageId })
  })
}

const useDeleteFavoriteRemove = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ encodedBaseImageId }: DeleteFavoriteRemoveReqData) =>
      deleteFavoriteRemove({ encodedBaseImageId }),
    onMutate: async ({ encodedBaseImageId }) => {
      await queryClient.cancelQueries({
        queryKey: ['favorites']
      })
      const previousData = queryClient.getQueryData(['favorites'])

      queryClient.setQueryData(['favorites'], (oldData) => ({
        ...oldData,
        pages: oldData.pages.map((page) => ({
          ...page,
          items: page.items.filter(
            (item) => item.encodedBaseImageId !== encodedBaseImageId
          )
        }))
      }))

      return { previousData }
    },
    onError: (_error, _variables, context) => {
      queryClient.setQueryData(['favorites'], context?.previousData)
    }
    // onSettled: () => {
    //   queryClient.invalidateQueries({queryKey: ['favorites']})
    // }
  })
}

export { usePostFavoriteAdd, useDeleteFavoriteRemove }
