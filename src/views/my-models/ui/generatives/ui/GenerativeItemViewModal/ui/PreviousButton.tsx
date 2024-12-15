'use client'

import { cn } from '@/shared/lib/utils'
import { Button } from '@/shared/ui'

import ChevronIcon from '/public/icons/chevron-left.svg'

interface PreviousButtonProps {
  hasPrevious: boolean
  onClickPrevious: () => void
}

export const PreviousButton = (props: PreviousButtonProps) => {
  return (
    <Button
      variant="outline"
      className={cn(
        'absolute -left-20 top-1/2 flex size-[3.125rem] items-center justify-center rounded-full bg-black p-3',
        {
          'cursor-not-allowed': !props.hasPrevious
        }
      )}
      onClick={props.onClickPrevious}
      aria-disabled={!props.hasPrevious}
      // disabled={itemIndex === 0}
    >
      <ChevronIcon width="24px" height="24px" />
    </Button>
  )
}
