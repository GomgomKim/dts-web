'use client'

import { useRouter } from 'next/navigation'

import * as entities from '@/entities/LikeButton'
import { useAuthStore } from '@/entities/UserProfile/store'

import { MainItem } from '@/shared/api/types'

import { useDeleteFavorite, usePostFavorite } from './adapter'

interface LikeButtonProps {
  item: MainItem
}

export const LikeButton = (props: LikeButtonProps) => {
  const { id, isFavorite } = props.item
  const addFavoriteMutation = usePostFavorite()
  const deleteFavoriteMutation = useDeleteFavorite()

  const isAuth = useAuthStore((state) => state.isAuth)
  const router = useRouter()

  const handleClick = () => {
    if (!isAuth) {
      router.push('/signup', { scroll: false })
      return
    }

    if (isFavorite) {
      deleteFavoriteMutation.mutate({ mainImageId: id.toString() })
    } else {
      addFavoriteMutation.mutate({ mainImageId: id.toString() })
    }
  }
  return <entities.LikeButton onClickLike={handleClick} isActive={isFavorite} />
}
