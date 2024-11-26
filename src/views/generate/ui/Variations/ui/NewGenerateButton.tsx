import { useHandleClickNewGenerate } from '@/features/generate-variation/useHandleNewGenerate'

import { cn } from '@/shared/lib/utils'

import DashedSvg from '/public/icons/dashed.svg'
import PlusIcon from '/public/icons/plus.svg'

interface NewGenerateButtonProps {
  disabled?: boolean
  onErrorGenerate: () => void
  onHoldingGenerate: () => void
}

export const NewGenerateButton = (props: NewGenerateButtonProps) => {
  const { debounceHandleClickNewGenerate, isOutOfCredit } =
    useHandleClickNewGenerate({
      onErrorGenerate: props.onErrorGenerate,
      onHoldingGenerate: props.onHoldingGenerate
    })

  return (
    <button
      key="new-generate"
      onClick={debounceHandleClickNewGenerate}
      className="group relative aspect-[206/219] w-full overflow-hidden rounded-[0.5rem] border border-[rgba(0,0,0,0)] bg-neutral-1/50 focus:outline-none focus-visible:border focus-visible:border-white focus-visible:ring-2 focus-visible:ring-ring enabled:hover:bg-neutral-1"
      disabled={props.disabled || isOutOfCredit || false}
    >
      <DashedSvg className="absolute inset-0 size-full" />
      <PlusIcon
        width="40px"
        height="40px"
        className={cn('absolute inset-0 m-auto stroke-neutral-5', {
          'group-hover:stroke-white group-active:stroke-white':
            !props.disabled && !isOutOfCredit
        })}
      />
      <span className="a11y-hidden">New Generate</span>
    </button>
  )
}
