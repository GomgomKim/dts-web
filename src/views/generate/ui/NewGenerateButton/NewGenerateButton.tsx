'use client'

import { useHandleClickNewGenerate } from '@/features/generate-variation/useHandleNewGenerate'

import { cn } from '@/shared/lib/utils'
import { Button } from '@/shared/ui'

import Spinner from '/public/icons/loading-spinner.svg'
import PlusIcon from '/public/icons/plus.svg'

interface NewGenerateButtonProps {
  disabled: boolean
  onErrorGenerate: () => void
  isHoldingGenerate: boolean
  onHoldingGenerate: () => void
}

export const NewGenerateButton = (props: NewGenerateButtonProps) => {
  const { debounceHandleClickNewGenerate, isOutOfCredit } =
    useHandleClickNewGenerate({
      onErrorGenerate: props.onErrorGenerate,
      onHoldingGenerate: props.onHoldingGenerate
    })

  if (props.isHoldingGenerate) {
    return (
      <Button
        disabled={true}
        className="py-2 pl-3 pr-4 rounded-[6px] flex items-center disabled:cursor-not-allowed disabled:bg-primary disabled:text-neutral-0"
      >
        <div className="w-4 h-4 mr-2">
          <Spinner
            className="animate-spin"
            width={16}
            height={16}
            fill="neutral-0"
          />
        </div>
        <span className="text-[0.875rem] leading-[17px] font-semibold">
          Generating...
        </span>
      </Button>
    )
  }

  return (
    <Button
      onClick={debounceHandleClickNewGenerate}
      disabled={props.disabled || isOutOfCredit}
      className="py-2 pl-3 pr-4 rounded-[6px] flex items-center"
    >
      <PlusIcon
        width="1rem"
        height="1rem"
        className={cn('mr-2 stroke-neutral-0 stroke-[1.33]', {
          'stroke-neutral-4': props.disabled || isOutOfCredit
        })}
      />
      <span className="text-[0.875rem] leading-[17px] font-semibold">
        New Generate
      </span>
    </Button>
  )
}
