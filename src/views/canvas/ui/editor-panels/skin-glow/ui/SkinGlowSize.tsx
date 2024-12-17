import { useSkinGlowStore } from '@/views/canvas/model/useEditorPanelsStore'

import { Slider } from '@/shared/ui/Slider'

export const SkinGlowSize = () => {
  const skinGlowSize = useSkinGlowStore((state) => state.skinGlowSize)
  const setSkinGlowSize = useSkinGlowStore((state) => state.setSkinGlowSize)

  return (
    <Slider
      value={[skinGlowSize]}
      max={100}
      step={1}
      onValueChange={(values) => {
        setSkinGlowSize(values[0])
      }}
    />
  )
}
