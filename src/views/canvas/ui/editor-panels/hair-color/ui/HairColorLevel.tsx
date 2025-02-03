import { useHairColorStore } from '@/views/canvas/model/useEditorPanelsStore'

import { Slider } from '@/shared/ui/Slider'

export const HairColorLevel = () => {
  const hairColorLevel = useHairColorStore((state) => state.hairColorLevel)
  const setHairColorLevel = useHairColorStore(
    (state) => state.setHairColorLevel
  )

  return (
    <Slider
      value={[hairColorLevel]}
      max={100}
      step={1}
      onValueChange={(values) => {
        setHairColorLevel(values[0])
      }}
    />
  )
}
