import { useColorBrushStore } from '@/views/canvas/model/useEditorPanelsStore'

import { Slider } from '@/shared/ui/Slider'

export const ColorBrushSmoothEdges = () => {
  const smoothEdges = useColorBrushStore((state) => state.colorBrushSmoothEdges)
  const setSmoothEdges = useColorBrushStore(
    (state) => state.setColorBrushSmoothEdges
  )

  return (
    <Slider
      value={[smoothEdges]}
      max={100}
      step={1}
      onValueChange={(values) => {
        setSmoothEdges(values[0])
      }}
    />
  )
}
