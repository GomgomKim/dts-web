'use client'

import * as entities from '@/entities/LikeButton'
import { useDeleteFavoriteRemove, usePostFavoriteAdd } from './adapter'

export type Props = {
  id: string
  isFavorite: boolean
  className?: string
}

export const LikeButton = (props: Props) => {
  const postFavoriteAdd = usePostFavoriteAdd()
  const deleteFavoriteRemove = useDeleteFavoriteRemove()

  const handleClick = () => {
    if (props.isFavorite) {
      deleteFavoriteRemove.mutate({ encodedBaseImageId: props.id })
    } else {
      postFavoriteAdd.mutate({ encodedBaseImageId: props.id })
    }
  }
  return (
    <entities.LikeButton
      handleClick={handleClick}
      isActive={props.isFavorite}
    />
  )
}
