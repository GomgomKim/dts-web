import { useMutation } from '@tanstack/react-query'
import { DeleteFavoriteRemoveReqData, PostFavoriteAddReqData } from './model'
import { deleteFavoriteRemove, postFavoriteAdd } from './api'

const usePostFavoriteAdd = () => {
  return useMutation({
    mutationFn: ({ encodedBaseImageId }: PostFavoriteAddReqData) =>
      postFavoriteAdd({ encodedBaseImageId })
    // onMutate: async ({ encodedBaseImageId }) => {
    // await queryClient.cancelQueries({
    //   queryKey: ['favorites']
    // })
    // const previousData = queryClient.getQueryData(['favorites'])
    // queryClient.setQueryData(['favorites'], (oldData) => ({
    //   ...oldData,
    //   pages: oldData.pages.map((page) => ({
    //     ...page,
    //     items: page.items.filter(
    //       (item) => item.encodedBaseImageId !== encodedBaseImageId
    //     )
    //   }))
    // }))
    // return { previousData },
    // onError: (_error, _variables, context) => {
    //   // queryClient.setQueryData(['favorites'], context?.previousData)
    // }
  })
}

const useDeleteFavoriteRemove = () => {
  return useMutation({
    mutationFn: ({ encodedBaseImageId }: DeleteFavoriteRemoveReqData) =>
      deleteFavoriteRemove({ encodedBaseImageId })
  })
}

export { usePostFavoriteAdd, useDeleteFavoriteRemove }
