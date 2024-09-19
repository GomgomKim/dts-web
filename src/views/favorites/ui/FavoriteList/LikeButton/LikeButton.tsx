'use client'

import * as entities from '@/entities/LikeButton'
import { useDeleteFavorite } from './adapter'
import { ModelImageItem } from '@/shared/api/types'

interface LikeButtonProps {
  item: ModelImageItem
}

export const LikeButton = (props: LikeButtonProps) => {
  const { encodedImageInfoId } = props.item
  const deleteFavoriteMutation = useDeleteFavorite()

  const handleClick = () => {
    deleteFavoriteMutation.mutate({ encodedImageInfoId })
  }

  return <entities.LikeButton onClickLike={handleClick} isActive={true} />
}
