'use client'

import { useState } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import { cn } from '@/shared/lib/utils'
import { Button } from '@/shared/ui'
import { useQueryClient } from '@tanstack/react-query'
import LikeIcon from '/public/icons/heart.svg'
import {
  useDeleteFavoriteRemove,
  usePostFavoriteAdd
} from '@/entities/favorites/like-button/adapter'

type LikeButtonProps = {
  id: string
  isFavorite: boolean
  className?: string
}

export const LikeButton = ({
  id,
  isFavorite,
  className,
  ...props
}: LikeButtonProps) => {
  const queryClient = useQueryClient()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [isActive, setIsActive] = useState(() =>
    pathname === '/favorites' ? true : isFavorite
  )

  // TODO: hook으로 빼기 + 낙관적 업데이트 적용
  const postFavoriteAdd = usePostFavoriteAdd()
  const deleteFavoriteRemove = useDeleteFavoriteRemove()

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    const tagType = searchParams.get('tagType')

    if (isActive) {
      deleteFavoriteRemove.mutate(
        { encodedBaseImageId: id },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['explore', tagType] })
            setIsActive((prev) => !prev)
          }
        }
      )
    } else {
      postFavoriteAdd.mutate(
        { encodedBaseImageId: id },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['explore', tagType] })
            setIsActive((prev) => !prev)
          }
        }
      )
    }
  }
  return (
    <Button
      asChild
      variant="secondary"
      size="icon"
      onClick={handleClick}
      className={cn('group', className)}
      {...props}
    >
      <span>
        <LikeIcon
          className={`stroke-current group-active:fill-primary group-active:stroke-primary ${isActive ? 'fill-primary stroke-primary' : ''}`}
        />
      </span>
    </Button>
  )
}
