'use client'

import * as entities from '@/entities/like-button'

import { MainItem } from '@/shared/api/types'

import { useDeleteFavorite } from './model/adapter'

interface LikeButtonProps {
  item: MainItem
}

export const LikeButton = (props: LikeButtonProps) => {
  const { id } = props.item
  const deleteFavoriteMutation = useDeleteFavorite()

  const handleClick = () => {
    deleteFavoriteMutation.mutate({ mainImageId: id.toString() })
  }

  return <entities.LikeButton onClickLike={handleClick} isActive={true} />
}
