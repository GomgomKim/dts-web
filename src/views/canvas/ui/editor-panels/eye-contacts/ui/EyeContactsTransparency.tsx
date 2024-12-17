import { useEyeContactsStore } from '@/views/canvas/model/useEditorPanelsStore'

import { Slider } from '@/shared/ui/Slider'

export const EyeContactsTransparency = () => {
  const transparency = useEyeContactsStore((state) => state.transparency)
  const setTransparency = useEyeContactsStore((state) => state.setTransparency)

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
