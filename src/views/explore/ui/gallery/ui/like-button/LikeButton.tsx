'use client'

import { useRouter } from 'next/navigation'

import * as entities from '@/entities/like-button'
import { useAuthStore } from '@/entities/user-profile/model/store'

import { MainItem } from '@/shared/api/types'
import { track } from '@/shared/lib/utils/mixpanel'

import { useDeleteFavorite, usePostFavorite } from './model/adapter'

interface LikeButtonProps {
  item: MainItem
}

export const LikeButton = (props: LikeButtonProps) => {
  const { id, isFavorite, name: modelname, tags } = props.item
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
      track.sendToMixpanel('favorite_model', {
        model_name: modelname,
        model_tag: tags.join(',')
      })
      addFavoriteMutation.mutate({ mainImageId: id.toString() })
    }
  }
  return <entities.LikeButton onClickLike={handleClick} isActive={isFavorite} />
}
