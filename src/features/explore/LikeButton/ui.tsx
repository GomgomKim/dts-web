'use client'

import * as entities from '@/entities/LikeButton'
import { useDeleteFavoriteRemove, usePostFavoriteAdd } from './adapter'
import { ModelImageItem } from '@/shared/api/types'
import { useAuthStore } from '@/entities/user/store'
import { useRouter } from 'next/navigation'

interface LikeButtonProps {
  item: ModelImageItem
}

export const LikeButton = (props: LikeButtonProps) => {
  const { encodedImageInfoId, isFavorite } = props.item
  const postFavoriteAdd = usePostFavoriteAdd()
  const deleteFavoriteRemove = useDeleteFavoriteRemove()

  const isAuth = useAuthStore((state) => state.isAuth)
  const router = useRouter()

  const handleClick = () => {
    if (!isAuth) {
      router.push('/signup')
      return
    }

    if (isFavorite) {
      deleteFavoriteRemove.mutate({ encodedImageInfoId })
    } else {
      postFavoriteAdd.mutate({ encodedImageInfoId })
    }
  }
  return <entities.LikeButton handleClick={handleClick} isActive={isFavorite} />
}
