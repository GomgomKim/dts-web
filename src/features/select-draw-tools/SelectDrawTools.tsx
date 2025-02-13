import React from 'react'

import { useColorBrushStore } from '@/views/canvas/model/useEditorPanelsStore'
import { createCustomBrush } from '@/views/canvas/ui/editor-panels/color-brush/model'

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
}

export const SelectDrawTools = (props: SelectDrawToolsProps) => {
  const addCustomBrush = useColorBrushStore((state) => state.addCustomBrush)
  const setSelectedColorBrushItem = useColorBrushStore(
    (state) => state.setSelectedColorBrushItem
  )
  const customBrushes = useColorBrushStore((state) => state.customBrushes)
  const addBrushTool = () => {
    // 새로 그린 브러시가 아직 등록되지 않았다면 새로 등록
    console.log('customBrushes:', customBrushes)
    const newBrush = createCustomBrush(customBrushes.length + 1)
    addCustomBrush(newBrush)
    setSelectedColorBrushItem(newBrush)
  }
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
          onClick={() => addBrushTool()}
          className="flex h-[5.8125rem] flex-col items-center justify-center gap-2 rounded-[0.5rem] border border-dashed border-neutral-3 p-5"
        >
          <Plus className="size-6 stroke-neutral-7" />
          <span className="text-[0.75rem]">{props.drawToolText}</span>
        </Button>
      )}
    </div>
  )
}
