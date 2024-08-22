'use client'

import * as entities from '@/entities/LikeButton'
import { useDeleteFavoriteRemove } from './adapter'

export type Props = {
  id: string
  className?: string
}

export const LikeButton = (props: Props) => {
  const deleteFavoriteRemove = useDeleteFavoriteRemove()

  const handleClick = () => {
    deleteFavoriteRemove.mutate({ encodedBaseImageId: props.id })
  }

  return <entities.LikeButton handleClick={handleClick} isActive={true} />
}
