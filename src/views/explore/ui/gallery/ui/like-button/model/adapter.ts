import { useSearchParams } from 'next/navigation'

import { deleteFavorite, postFavorite } from '@/entities/like-button/model/api'
import {
  DeleteFavoriteReqData,
  PostFavoriteReqData
} from '@/entities/like-button/model/types'

import { useMutation, useQueryClient } from '@tanstack/react-query'

import { TAG_TYPES } from '../../../constant'
import { GetExploreListResData } from '../../../model/types'

// TODO: invalidate 작동 후 스크롤 유지

export const usePostFavorite = () => {
  const queryClient = useQueryClient()

  const searchParams = useSearchParams()
  const tagType = searchParams.get('tagType') || TAG_TYPES[0]
  const queryKey = ['explore', tagType]

  return useMutation({
    mutationFn: ({ mainImageId }: PostFavoriteReqData) =>
      postFavorite({ mainImageId }),
    onMutate: async ({ mainImageId }) => {
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
                images: page.content.data.map((item) => {
                  if (item.id.toString() === mainImageId) {
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

export const useDeleteFavorite = () => {
  const queryClient = useQueryClient()

  const searchParams = useSearchParams()
  const tagType = searchParams.get('tagType') || TAG_TYPES[0]
  const queryKey = ['explore', tagType]

  return useMutation({
    mutationFn: ({ mainImageId }: DeleteFavoriteReqData) =>
      deleteFavorite({ mainImageId }),
    onMutate: async ({ mainImageId }) => {
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
                images: page.content.data.map((item) => {
                  if (item.id.toString() === mainImageId)
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
