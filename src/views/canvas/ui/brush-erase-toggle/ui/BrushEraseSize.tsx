import { useToolModeStore } from '@/views/canvas/model/useToolModeStore'

import { Slider } from '@/shared/ui/Slider'

export const BrushEraseSize = () => {
  const toolSize = useToolModeStore((state) => state.toolSize)
  const setToolSize = useToolModeStore((state) => state.setToolSize)

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
