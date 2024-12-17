import React from 'react'

import { DrawTool } from '@/features/select-draw-tools/model/types'
import { DrawToolType } from '@/features/select-draw-tools/model/types'

import { cn } from '@/shared/lib/utils'
import { Button } from '@/shared/ui'

import BrushIcon from '/public/icons/color-brush.svg'
import SkinGlowIcon from '/public/icons/skin-glow.svg'

interface DrawToolsProps {
  toolType: DrawToolType
  tool: DrawTool
  selected: boolean
  onSelect: (tool: DrawTool) => void
}

export const DrawTools = (props: DrawToolsProps) => {
  return (
    <Button
      variant="ghost"
      onClick={() => props.onSelect(props.tool)}
      className={cn(
        'flex h-[5.8125rem] flex-col items-center justify-center gap-3 rounded-[0.5rem] p-5',
        props.selected && 'bg-secondary text-white'
      )}
    >
      {props.toolType === 'BRUSH' && <BrushIcon className="size-6" />}
      {props.toolType === 'SKIN_GLOW' && <SkinGlowIcon className="size-6" />}
      <span className="text-[0.75rem]">{props.tool.text}</span>
    </Button>
  )
}
