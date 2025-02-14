import React from 'react'

import { cn } from '@/shared/lib/utils'

import ColorBrushDarkIcon from '/public/icons/color-brush-dark.svg'
import EraseIcon from '/public/icons/erase-dark.svg'

import { TOOL_IDS, TOOL_MODE, UI_TEXT } from './model'
import { BrushEraseSize, ToggleToolButton } from './ui'

interface BrushEraseToggleProps {
  selectedToolId: TOOL_MODE | null
  onSelectTool: (toolId: TOOL_MODE) => void
}

export const BrushEraseToggle = (props: BrushEraseToggleProps) => {
  const handleClickBrushErase = (tool: TOOL_MODE) => {
    props.onSelectTool(tool)
  }

  return (
    <div
      className={cn(
        'flex items-center',
        'h-16 w-[35rem]',
        'gap-4 pl-3 pr-8',
        'rounded-[100px] border border-neutral-2 bg-neutral-1'
      )}
      onMouseDown={(e) => {
        e.nativeEvent.stopImmediatePropagation()
      }}
      onTouchStart={(e) => {
        e.nativeEvent.stopImmediatePropagation()
      }}
      onClick={(e) => {
        e.nativeEvent.stopImmediatePropagation()
      }}
    >
      <div
        className={cn(
          'flex',
          'h-12 w-[12.5rem]',
          'p-1',
          'rounded-[100px] bg-neutral-2'
        )}
      >
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

      <h4 className="text-[0.875rem] font-medium text-neutral-5">
        {UI_TEXT.SIZE}
      </h4>
      <BrushEraseSize />
    </div>
  )
}
