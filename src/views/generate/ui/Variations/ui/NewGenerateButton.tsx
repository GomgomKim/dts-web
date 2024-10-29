import { useHandleClickNewGenerate } from '@/features/generate-variation/useHandleNewGenerate'

import { cn } from '@/shared/lib/utils'

import DashedSvg from '/public/icons/dashed.svg'
import PlusIcon from '/public/icons/plus.svg'

interface NewGenerateButtonProps {
  disabled?: boolean
}

export const NewGenerateButton = (props: NewGenerateButtonProps) => {
  const { debounceHandleClickNewGenerate, isOutOfCredit } =
    useHandleClickNewGenerate()

  return (
    <button
      key="new-generate"
      onClick={debounceHandleClickNewGenerate}
      className="relative border border-[rgba(0,0,0,0)] rounded-[0.5rem] aspect-[206/219] w-full bg-neutral-1 bg-opacity-50 overflow-hidden group enabled:hover:bg-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      disabled={props.disabled || isOutOfCredit || false}
    >
      <DashedSvg className="absolute inset-0 w-full h-full" />
      <PlusIcon
        width="40px"
        height="40px"
        className={cn('absolute inset-0 m-auto stroke-neutral-5', {
          'group-hover:stroke-white group-active:stroke-white':
            !props.disabled || !isOutOfCredit
        })}
      />
      <span className="a11y-hidden">New Generate</span>
    </button>
  )
}
