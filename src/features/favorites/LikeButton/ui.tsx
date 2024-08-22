'use client'

import * as entities from '@/entities/LikeButton'
import { useDeleteFavoriteRemove } from './adapter'
import { ModelImageItem } from '@/features/explore/CardList/model'

export type Props = {
  item: ModelImageItem
}

export const LikeButton = (props: Props) => {
  const { encodedBaseImageId } = props.item
  const deleteFavoriteRemove = useDeleteFavoriteRemove()

  const handleClick = () => {
    deleteFavoriteRemove.mutate({ encodedBaseImageId })
  }

  return <entities.LikeButton handleClick={handleClick} isActive={true} />
}
