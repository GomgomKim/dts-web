import { useCreamTextureStore } from '@/views/canvas/model/useEditorPanelsStore'

import { Slider } from '@/shared/ui/Slider'

export const CreamTextureTransparency = () => {
  const transparency = useCreamTextureStore((state) => state.transparency)
  const setTransparency = useCreamTextureStore((state) => state.setTransparency)

  return (
    <Slider
      value={[transparency]}
      max={100}
      step={1}
      onValueChange={(values) => {
        // TODO: tooltip 추가
        setTransparency(values[0])
      }}
    />
  )
}
