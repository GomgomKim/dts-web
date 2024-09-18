'use client'

import { cn } from '@/shared/lib/utils'
import { Button } from '@/shared/ui'
import LikeIcon from '/public/icons/heart.svg'

interface LikeButtonProps {
  handleClick: () => void
  isActive: boolean
  className?: string
}

export const LikeButton = ({
  handleClick,
  isActive,
  className,
  ...props
}: LikeButtonProps) => {
  return (
    <Button
      asChild
      variant="secondary"
      size="icon"
      onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        handleClick()
      }}
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
