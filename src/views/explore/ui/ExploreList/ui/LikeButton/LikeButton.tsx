'use client'

import { useRouter } from 'next/navigation'
import { ModelImageItem } from '@/shared/api/types'
import * as entities from '@/entities/LikeButton'
import { useAuthStore } from '@/entities/UserProfile/store'
import { useDeleteFavorite, usePostFavorite } from './adapter'

interface LikeButtonProps {
  item: ModelImageItem
}

export const LikeButton = (props: LikeButtonProps) => {
  const { encodedImageInfoId, isFavorite } = props.item
  const addFavoriteMutation = usePostFavorite()
  const deleteFavoriteMutation = useDeleteFavorite()

  const isAuth = useAuthStore((state) => state.isAuth)
  const router = useRouter()

  const handleClick = () => {
    if (!isAuth) {
      router.push('/signup')
      return
    }

    if (isFavorite) {
      deleteFavoriteMutation.mutate({ encodedImageInfoId })
    } else {
      addFavoriteMutation.mutate({ encodedImageInfoId })
    }
  }
  return <entities.LikeButton handleClick={handleClick} isActive={isFavorite} />
}
