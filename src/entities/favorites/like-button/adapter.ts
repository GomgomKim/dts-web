import { useMutation } from '@tanstack/react-query'
import { deleteFavoriteRemove, postFavoriteAdd } from './api'
import { DeleteFavoriteRemoveReqData, PostFavoriteAddReqData } from './model'

const usePostFavoriteAdd = () => {
  return useMutation({
    mutationFn: ({ encodedBaseImageId }: PostFavoriteAddReqData) =>
      postFavoriteAdd({ encodedBaseImageId })
  })
}

const useDeleteFavoriteRemove = () => {
  return useMutation({
    mutationFn: ({ encodedBaseImageId }: DeleteFavoriteRemoveReqData) =>
      deleteFavoriteRemove({ encodedBaseImageId })
  })
}

export { usePostFavoriteAdd, useDeleteFavoriteRemove }
