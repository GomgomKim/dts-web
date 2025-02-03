import { useHairColorStore } from '@/views/canvas/model/useEditorPanelsStore'

import { AiToolId } from '@/widgets/canvas-sidebar/model/types'
import { DrawingPanel } from '@/widgets/editor-panel'
import { UI_TEXT as DRAWING_PANEL_UI_TEXT } from '@/widgets/editor-panel/drawing-panel/model'

import { HAIR_COLOR_PRESETS, UI_TEXT } from './model'
import { HairColorLevel, HairColorPresetButton } from './ui'

interface HairColorProps {
  id: AiToolId | null
}

export const HairColor = (props: HairColorProps) => {
  const hairColor = useHairColorStore((state) => state.hairColor)
  const setHairColor = useHairColorStore((state) => state.setHairColor)

  const prefixContent = (
    <div className="grid grid-cols-5 gap-2">
      {HAIR_COLOR_PRESETS.map((preset) => (
        <HairColorPresetButton
          key={preset.name}
          name={preset.name}
          backgroundImage={preset.backgroundImage}
          selected={hairColor === preset.color}
          handleClickButton={() => setHairColor(preset.color)}
        />
      ))}
    </div>
  )

  const postfixContent = (
    <div className="mt-4">
      <h4 className="mb-2 text-[1rem] text-neutral-7">
        {DRAWING_PANEL_UI_TEXT.HAIR_COLOR_LEVEL}
      </h4>
      <HairColorLevel />
    </div>
  )

  return (
    <DrawingPanel
      title={UI_TEXT.HAIR_COLOR}
      panelId={props.id ?? ''}
      prefixColors={prefixContent}
      postfixColors={postfixContent}
    />
  )
}
