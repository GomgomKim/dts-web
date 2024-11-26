'use client'

import React from 'react'

import { cn } from '@/shared/lib/utils'
import { Button } from '@/shared/ui'

import LikeIcon from '/public/icons/heart.svg'

interface LikeButtonProps extends React.ComponentProps<'button'> {
  onClickLike: () => void
  isActive: boolean
}

export const LikeButton = (props: LikeButtonProps) => {
  return (
    <Button
      asChild
      variant="secondary"
      size="icon"
      onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.stopPropagation()
        props.onClickLike()
      }}
      className={cn('group', props.className)}
    >
      <span>
        <LikeIcon
          className={`cursor-pointer group-active:fill-primary group-active:stroke-primary ${props.isActive ? 'fill-primary stroke-primary' : 'stroke-current'}`}
        />
      </span>
    </Button>
  )
}
