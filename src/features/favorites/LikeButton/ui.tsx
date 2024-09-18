'use client'

import * as entities from '@/entities/LikeButton'
import { useDeleteFavoriteRemove } from './adapter'
import { ModelImageItem } from '@/shared/api/types'

export type Props = {
  item: ModelImageItem
}

export const LikeButton = (props: Props) => {
  const { encodedImageInfoId } = props.item
  const deleteFavoriteRemove = useDeleteFavoriteRemove()

  const handleClick = () => {
    deleteFavoriteRemove.mutate({ encodedImageInfoId })
  }

  return <entities.LikeButton handleClick={handleClick} isActive={true} />
}
