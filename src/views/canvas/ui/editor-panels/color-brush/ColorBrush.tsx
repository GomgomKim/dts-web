import { useColorBrushStore } from '@/views/canvas/model/useEditorPanelsStore'
import { UI_TEXT } from '@/views/canvas/ui/editor-panels/color-brush/model'
import { ColorBrushSmoothEdges } from '@/views/canvas/ui/editor-panels/color-brush/ui/ColorBrushSmoothEdges'

import { AiToolId } from '@/widgets/canvas-sidebar/model/types'
import { DrawingPanel } from '@/widgets/editor-panel'
import { UI_TEXT as DRAWING_PANEL_UI_TEXT } from '@/widgets/editor-panel/drawing-panel/model'

import { SelectDrawTools } from '@/features/select-draw-tools'
import { TOOL_TYPE } from '@/features/select-draw-tools/model/constants'
import { DrawTool } from '@/features/select-draw-tools/model/types'

import { DUMMY_DATA } from './model'

interface ColorBrushProps {
  id: AiToolId | null
}

export const ColorBrush = (props: ColorBrushProps) => {
  const selectedColorBrushItem = useColorBrushStore(
    (state) => state.selectedColorBrushItem
  )
  const setSelectedColorBrushItem = useColorBrushStore(
    (state) => state.setSelectedColorBrushItem
  )
  const customBrushes = useColorBrushStore((state) => state.customBrushes)

  // DUMMY_DATA와 customBrushes 합치기
  const allTools = [...DUMMY_DATA, ...customBrushes]

  const prefixContent = (
    <SelectDrawTools
      toolType={TOOL_TYPE.BRUSH}
      selectedDrawTool={selectedColorBrushItem ?? null}
      onSelectDrawTool={(item: DrawTool) => setSelectedColorBrushItem(item)}
      tools={allTools}
      drawToolText={UI_TEXT.BRUSH}
    />
  )

  const postfixContent = (
    <div
      className="mt-4"
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
      <h4 className="mb-2 text-[1rem] text-neutral-7">
        {DRAWING_PANEL_UI_TEXT.SMOOTH_EDGES}
      </h4>
      <ColorBrushSmoothEdges />
    </div>
  )

  return (
    <DrawingPanel
      title={UI_TEXT.SELECT_AREA}
      panelId={props.id ?? ''}
      prefixColors={prefixContent}
      postfixColors={postfixContent}
    />
  )
}
