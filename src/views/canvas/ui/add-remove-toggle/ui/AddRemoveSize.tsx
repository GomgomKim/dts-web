import { useEditModeStore } from '@/views/canvas/model/useEditModeStore'

import { Slider } from '@/shared/ui/Slider'

export const AddRemoveSize = () => {
  const toolSize = useEditModeStore((state) => state.toolSize)
  const setToolSize = useEditModeStore((state) => state.setToolSize)

  return (
    <Slider
      value={[toolSize]}
      max={100}
      step={1}
      onValueChange={(values) => {
        setToolSize(values[0])
      }}
    />
  )
}
