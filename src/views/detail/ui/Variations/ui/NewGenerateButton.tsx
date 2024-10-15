import { useHandleClickNewGenerate } from '@/features/generate-variation/useHandleNewGenerate'

import { cn } from '@/shared/lib/utils'

import DashedSvg from '/public/icons/dashed.svg'
import PlusIcon from '/public/icons/plus.svg'

interface NewGenerateButtonProps {
  disabled?: boolean
}

export const NewGenerateButton = (props: NewGenerateButtonProps) => {
  const { debounceHandleClickNewGenerate, isRemainCredit } =
    useHandleClickNewGenerate()

  return (
    <button
      key="new-generate"
      onClick={debounceHandleClickNewGenerate}
      className="relative border border-[rgba(0,0,0,0)] rounded-[0.5rem] aspect-[206/219] w-full bg-neutral-1 bg-opacity-50 overflow-hidden group enabled:hover:bg-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      disabled={props.disabled || !isRemainCredit || false}
    >
      <DashedSvg className="absolute inset-0 w-full h-full" />
      <PlusIcon
        className={cn(
          'absolute inset-0 m-auto w-10 h-10 stroke-neutral-7 enabled:group-hover:stroke-white enabled:group-active:stroke-white',
          { 'stroke-neutral-3': props.disabled || !isRemainCredit }
        )}
      />
      <span className="a11y-hidden">New Generate</span>
    </button>
  )
}
