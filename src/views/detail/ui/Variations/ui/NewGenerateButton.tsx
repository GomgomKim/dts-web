import { useHandleClickNewGenerate } from '@/features/generate-variation/useHandleNewGenerate'

import DashedSvg from '/public/icons/dashed.svg'
import PlusIcon from '/public/icons/plus.svg'

interface NewGenerateButtonProps {
  disabled?: boolean
}

export const NewGenerateButton = (props: NewGenerateButtonProps) => {
  const { debounceHandleClickNewGenerate } = useHandleClickNewGenerate()

  return (
    <button
      key="new-generate"
      onClick={debounceHandleClickNewGenerate}
      className="relative rounded-[0.5rem] aspect-[206/219] w-full bg-neutral-1 bg-opacity-50 overflow-hidden group enabled:hover:bg-opacity-100"
      disabled={props.disabled || false}
    >
      <DashedSvg />
      <PlusIcon className="absolute inset-0 m-auto w-10 h-10 stroke-neutral-7 enabled:group-hover:stroke-white enabled:group-active:stroke-white" />
      <span className="a11y-hidden">New Generate</span>
    </button>
  )
}
