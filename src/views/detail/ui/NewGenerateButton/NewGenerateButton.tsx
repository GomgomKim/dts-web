import { useHandleClickNewGenerate } from '@/features/generate-variation/useHandleNewGenerate'

import { Button } from '@/shared/ui'

import PlusIcon from '/public/icons/plus.svg'

export const NewGenerateButton = () => {
  const { debounceHandleClickNewGenerate } = useHandleClickNewGenerate()

  return (
    <Button variant="sub2" onClick={debounceHandleClickNewGenerate}>
      <PlusIcon
        width="1rem"
        height="1rem"
        className="stroke-[#76777D] group-hover:stroke-white group-active:stroke-white mr-2"
      />
      <span className="text-[0.875rem]">New Generate</span>
    </Button>
  )
}
