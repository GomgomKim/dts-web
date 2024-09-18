import {
  deleteFavoriteRemove,
  postFavoriteAdd
} from '@/entities/LikeButton/api'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useSearchParams } from 'next/navigation'
import { GetExploreListResData } from '../CardList/types'
import { FILTER_TYPES } from '@/features/favorites/FavoriteList/constant'
import {
  DeleteFavoriteReqData,
  PostFavoriteReqData
} from '@/entities/LikeButton/types'

// TODO: invalidate 작동 후 스크롤 유지

export const usePostFavoriteAdd = () => {
  const queryClient = useQueryClient()

  const searchParams = useSearchParams()
  const filterType = searchParams.get('filterType') || FILTER_TYPES[0]
  const queryKey = ['explore', filterType]

  return useMutation({
    mutationFn: ({ encodedImageInfoId }: PostFavoriteReqData) =>
      postFavoriteAdd({ encodedImageInfoId }),
    onMutate: async ({ encodedImageInfoId }) => {
      await queryClient.cancelQueries({
        queryKey: queryKey
      })

      const previousData = queryClient.getQueryData<{
        pages: GetExploreListResData[]
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
                images: page.content.images.map((item) => {
                  if (item.encodedImageInfoId === encodedImageInfoId) {
                    return { ...item, isFavorite: true }
                  }
                  return item
                })
              }
            }))
          }
        }
      )

      return { previousData }
    },
    onError: (error) => {
      // onError: (error, _variables, context) => {
      //   queryClient.setQueryData(queryKey, context?.previousData)
      console.log('failed to add favorite in explore page')
      console.error(error)
    }
    // onSettled: () => {
    //   queryClient.invalidateQueries({ queryKey: queryKey })
    // }
  })
}

export const useDeleteFavoriteRemove = () => {
  const queryClient = useQueryClient()

  const searchParams = useSearchParams()
  const filterType = searchParams.get('filterType') || FILTER_TYPES[0]
  const queryKey = ['explore', filterType]

  return useMutation({
    mutationFn: ({ encodedImageInfoId }: DeleteFavoriteReqData) =>
      deleteFavoriteRemove({ encodedImageInfoId }),
    onMutate: async ({ encodedImageInfoId }) => {
      await queryClient.cancelQueries({
        queryKey: queryKey
      })

      const previousData = queryClient.getQueryData<{
        pages: GetExploreListResData[]
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
                images: page.content.images.map((item) => {
                  if (item.encodedImageInfoId === encodedImageInfoId)
                    return { ...item, isFavorite: false }
                  return item
                })
              }
            }))
          }
        }
      )

      return { previousData }
    },
    onError: (error, _variables, context) => {
      queryClient.setQueryData(queryKey, context?.previousData)
      console.log('failed to delete favorite in explore page')
      console.error(error)
    }
    // onSettled: () => {
    //   queryClient.invalidateQueries({ queryKey: queryKey })
    // }
  })
}
