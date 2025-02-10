import { useSkinGlowStore } from '@/views/canvas/model/useEditorPanelsStore'

import { Slider } from '@/shared/ui/Slider'

export const SkinGlowPower = () => {
  const skinGlowPower = useSkinGlowStore((state) => state.skinGlowPower)
  const setSkinGlowPower = useSkinGlowStore((state) => state.setSkinGlowPower)

  return (
    <Slider
      value={[skinGlowPower]}
      max={100}
      step={1}
      onValueChange={(values) => {
        setSkinGlowPower(values[0])
      }}
    />
  )
}
