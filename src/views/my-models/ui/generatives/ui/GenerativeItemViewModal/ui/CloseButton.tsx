'use client'

import { Button } from '@/shared/ui'

import CloseIcon from '/public/icons/x.svg'

interface CloseButtonProps {
  onClickClose: () => void
}

export const CloseButton = (props: CloseButtonProps) => {
  return (
    <Button
      variant="ghost"
      size="icon"
      className="group absolute right-3 top-3 flex size-6 items-center justify-center rounded hover:bg-neutral-1"
      onClick={props.onClickClose}
    >
      <CloseIcon className="stroke-neutral-7 group-hover:stroke-white" />
      <span className="a11y-hidden">close</span>
    </Button>
  )
}
