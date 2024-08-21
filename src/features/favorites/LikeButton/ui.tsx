'use client'

import * as entities from '@/entities/LikeButton'
import {
  useDeleteFavoriteRemove,
  usePostFavoriteAdd
} from '@/entities/LikeButton/adapter'
import { useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { useSearchParams } from 'next/navigation'

export type Props = {
  id: string
  isFavorite: boolean
  className?: string
}

export const LikeButton = (props: Props) => {
  const queryClient = useQueryClient()

  const searchParams = useSearchParams()
  const [isActive, setIsActive] = useState(true)

  // TODO: hook으로 빼기 + 낙관적 업데이트 적용
  const postFavoriteAdd = usePostFavoriteAdd()
  const deleteFavoriteRemove = useDeleteFavoriteRemove()

  const handleClick = () => {
    const tagType = searchParams.get('tagType')

    if (isActive) {
      deleteFavoriteRemove.mutate(
        { encodedBaseImageId: props.id },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['favorites', tagType] })
            setIsActive((prev) => !prev)
          }
        }
      )
    } else {
      postFavoriteAdd.mutate(
        { encodedBaseImageId: props.id },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['favorites', tagType] })
            setIsActive((prev) => !prev)
          }
        }
      )
    }
  }
  return <entities.LikeButton handleClick={handleClick} isActive={isActive} />
}
