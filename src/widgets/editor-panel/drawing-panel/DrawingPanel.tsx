'use client'

import { UI_TEXT } from '@/widgets/editor-panel/drawing-panel/model'

import { ColorPicker } from '@/entities/color-picker'

import { EditorPanel } from '@/shared/ui/editor-panel'

interface DrawingPanelProps {
  title: string
  panelId: string
  toggleAutoSelect?: React.ReactNode
  prefixColors?: React.ReactNode
  postfixColors?: React.ReactNode
}

export const DrawingPanel = (props: DrawingPanelProps) => {
  return (
    <EditorPanel title={props.title} postfix={props.toggleAutoSelect}>
      {props.prefixColors ? props.prefixColors : null}

      {/* Colors */}
      <div className="h-[19.375rem] w-full pt-4">
        <span className="text-[1.125rem] font-bold text-white">
          {UI_TEXT.COLORS}
        </span>
        <div className="mt-3">
          <ColorPicker />
        </div>
      </div>

      {props.postfixColors ? props.postfixColors : null}
    </EditorPanel>
  )
}
