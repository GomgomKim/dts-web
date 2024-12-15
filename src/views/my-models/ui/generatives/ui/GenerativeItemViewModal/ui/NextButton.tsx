'use client'

import { cn } from '@/shared/lib/utils'
import { Button } from '@/shared/ui'

import ChevronIcon from '/public/icons/chevron-left.svg'

interface NextButtonProps {
  hasNext: boolean
  onClickNext: () => void
}

export const NextButton = (props: NextButtonProps) => {
  return (
    <Button
      variant="outline"
      className={cn(
        'absolute -right-20 top-1/2 flex size-[3.125rem] items-center justify-center rounded-full bg-black p-3',
        {
          'cursor-not-allowed': !props.hasNext
        }
      )}
      onClick={props.onClickNext}
      aria-disabled={!props.hasNext}
      // disabled={itemIndex === DATA.length - 1}
    >
      <ChevronIcon width="24px" height="24px" className="rotate-180" />
    </Button>
  )
}
