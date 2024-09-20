import { useHandleClickNewGenerate } from '@/features/generate-variation/useHandleNewGenerate'

import { Button } from '@/shared/ui'

import PlusIcon from '/public/icons/plus.svg'

export const NewGenerateButton = () => {
  const { handleClickNewGenerate } = useHandleClickNewGenerate()
  return (
    <Button
      variant="outline"
      className="bg-background bg-opacity-50 rounded-[0.5rem] group border-neutral-1 text-neutral-7"
      onClick={handleClickNewGenerate}
    >
      <PlusIcon
        width="1rem"
        height="1rem"
        className="stroke-[#76777D] group-hover:stroke-white group-active:stroke-white mr-2"
      />
      <span className="text-[0.875rem]">New Generate</span>
    </Button>
  )
}
