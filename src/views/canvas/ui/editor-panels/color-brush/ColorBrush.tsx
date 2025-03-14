import { useColorBrushStore } from '@/views/canvas/model/useEditorPanelsStore'
import { UI_TEXT } from '@/views/canvas/ui/editor-panels/color-brush/model'
import { AutoSelectToggle } from '@/views/canvas/ui/editor-panels/color-brush/ui/AutoSelectToggle'
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

  const prefixContent = (
    <SelectDrawTools
      toolType={TOOL_TYPE.BRUSH}
      selectedDrawTool={selectedColorBrushItem ?? null}
      onSelectDrawTool={(item: DrawTool) => setSelectedColorBrushItem(item)}
      tools={DUMMY_DATA}
      drawToolText={UI_TEXT.BRUSH}
    />
  )

  const postfixContent = (
    <div className="mt-4">
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
      toggleAutoSelect={<AutoSelectToggle />}
      prefixColors={prefixContent}
      postfixColors={postfixContent}
    />
  )
}
