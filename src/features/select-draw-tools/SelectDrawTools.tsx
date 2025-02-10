import React from 'react'

import {
  DrawTool,
  DrawToolType
} from '@/features/select-draw-tools/model/types'
import { DrawTools } from '@/features/select-draw-tools/ui'

import { Button } from '@/shared/ui'

import Plus from '/public/icons/plus.svg'

export interface SelectDrawToolsProps {
  toolType: DrawToolType
  selectedDrawTool: DrawTool | null
  onSelectDrawTool: (tool: DrawTool) => void
  tools: DrawTool[]
  drawToolText: string
  onAddTool: () => void
}

export const SelectDrawTools = (props: SelectDrawToolsProps) => {
  return (
    <div className="grid w-full grid-cols-4 gap-2">
      {/* 툴 버튼 */}
      {props.tools.map((tool: DrawTool) => (
        <DrawTools
          toolType={props.toolType}
          key={tool.id}
          tool={tool}
          selected={props.selectedDrawTool?.id === tool.id}
          onSelect={props.onSelectDrawTool}
        />
      ))}

      {/* 툴 추가 버튼 */}
      {props.tools.length < 8 && (
        <Button
          variant="ghost"
          onClick={props.onAddTool}
          className="flex h-[5.8125rem] flex-col items-center justify-center gap-2 rounded-[0.5rem] border border-dashed border-neutral-3 p-5"
        >
          <Plus className="size-6 stroke-neutral-7" />
          <span className="text-[0.75rem]">{props.drawToolText}</span>
        </Button>
      )}
    </div>
  )
}
