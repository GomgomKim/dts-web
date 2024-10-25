import { useHandleClickNewGenerate } from '@/features/generate-variation/useHandleNewGenerate'

import { cn } from '@/shared/lib/utils'
import { Button } from '@/shared/ui'

import PlusIcon from '/public/icons/plus.svg'

interface NewGenerateButtonProps {
  disabled: boolean
}

export const NewGenerateButton = (props: NewGenerateButtonProps) => {
  const { debounceHandleClickNewGenerate, isRemainCredit } =
    useHandleClickNewGenerate()

  return (
    <Button
      onClick={debounceHandleClickNewGenerate}
      disabled={props.disabled || !isRemainCredit}
      className="py-2 pl-3 pr-4 rounded-[6px] flex items-center"
    >
      <PlusIcon
        width="1rem"
        height="1rem"
        className={cn('mr-2 stroke-neutral-0 stroke-[1.33]', {
          'stroke-neutral-4': props.disabled || !isRemainCredit
        })}
      />
      <span className="text-[0.875rem] leading-[17px] font-semibold">
        New Generate
      </span>
    </Button>
  )
}
