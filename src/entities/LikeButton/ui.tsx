'use client'

import { cn } from '@/shared/lib/utils'
import { Button } from '@/shared/ui'
import LikeIcon from '/public/icons/heart.svg'
import React from 'react'

interface LikeButtonProps extends React.ComponentProps<'button'> {
  onClickLike: () => void
  isActive: boolean
}

export const LikeButton = (props: LikeButtonProps) => {
  return (
    <Button
      {...props}
      asChild
      variant="secondary"
      size="icon"
      onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        props.onClickLike()
      }}
      className={cn('group', props.className)}
    >
      <span>
        <LikeIcon
          className={`stroke-current group-active:fill-primary group-active:stroke-primary ${props.isActive ? 'fill-primary stroke-primary' : ''}`}
        />
      </span>
    </Button>
  )
}
