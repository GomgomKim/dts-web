'use client'

import * as entities from '@/entities/LikeButton'
import { useDeleteFavoriteRemove, usePostFavoriteAdd } from './adapter'
import { ModelImageItem } from '../CardList/model'

export type Props = {
  item: ModelImageItem
}

export const LikeButton = (props: Props) => {
  const { encodedImageInfoId, isFavorite } = props.item
  const postFavoriteAdd = usePostFavoriteAdd()
  const deleteFavoriteRemove = useDeleteFavoriteRemove()

  const handleClick = () => {
    if (isFavorite) {
      deleteFavoriteRemove.mutate({ encodedImageInfoId })
    } else {
      postFavoriteAdd.mutate({ encodedImageInfoId })
    }
  }
  return <entities.LikeButton handleClick={handleClick} isActive={isFavorite} />
}
