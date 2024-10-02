import { useHandleClickNewGenerate } from '@/features/generate-variation/useHandleNewGenerate'

import DashedSvg from '/public/icons/dashed.svg'
import PlusIcon from '/public/icons/plus.svg'

export const NewGenerateButton = () => {
  const { debounceHandleClickNewGenerate } = useHandleClickNewGenerate()

  return (
    <button
      key="new-generate"
      onClick={debounceHandleClickNewGenerate}
      className="relative rounded-[0.5rem] aspect-[206/219] w-full bg-neutral-1 bg-opacity-50 overflow-hidden group"
    >
      <DashedSvg />
      <PlusIcon className="absolute inset-0 m-auto w-10 h-10 stroke-[#76777D] group-hover:stroke-neutral-7 group-active:stroke-neutral-7" />
      <span className="a11y-hidden">New Generate</span>
    </button>
  )
}
