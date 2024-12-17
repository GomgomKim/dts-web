import React from 'react'

import { TOOL_IDS, UI_TEXT } from '@/entities/brush-erase-toggle/model'
import { ToggleToolButton } from '@/entities/brush-erase-toggle/ui'

import ColorBrushDarkIcon from '/public/icons/color-brush-dark.svg'
import EraseIcon from '/public/icons/color-erase.svg'

interface BrushEraseToggleProps {
  selectedToolId: string | null
  onSelectTool: (toolId: string) => void
}

export const BrushEraseToggle = (props: BrushEraseToggleProps) => {
  const handleClickBrushErase = (tool: string) => {
    props.onSelectTool(tool)
  }

  return (
    <div className="flex h-14 w-full items-center justify-between gap-2 rounded-[0.5rem] bg-[#2D2E33] p-2">
      <ToggleToolButton
        icon={<ColorBrushDarkIcon />}
        text={UI_TEXT.BRUSH}
        selected={props.selectedToolId === TOOL_IDS.BRUSH}
        onClick={() => handleClickBrushErase(TOOL_IDS.BRUSH)}
      />

      <ToggleToolButton
        icon={<EraseIcon />}
        text={UI_TEXT.ERASE}
        selected={props.selectedToolId === TOOL_IDS.ERASE}
        onClick={() => handleClickBrushErase(TOOL_IDS.ERASE)}
      />
    </div>
  )
}
