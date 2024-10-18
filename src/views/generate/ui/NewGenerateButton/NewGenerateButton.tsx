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
      variant="sub2"
      onClick={debounceHandleClickNewGenerate}
      disabled={props.disabled || !isRemainCredit}
    >
      <PlusIcon
        width="1rem"
        height="1rem"
        className={cn(
          'stroke-neutral-5 group-hover:stroke-white group-active:stroke-white mr-2',
          { 'stroke-neutral-3': props.disabled || !isRemainCredit }
        )}
      />
      <span className="text-[0.875rem]">New Generate</span>
    </Button>
  )
}
