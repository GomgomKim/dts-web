import { useColorBrushStore } from '@/views/canvas/model/useEditorPanelsStore'
import {
  DUMMY_DATA,
  UI_TEXT
} from '@/views/canvas/ui/editor-panels/color-brush/model'
import { SkinGlowSize } from '@/views/canvas/ui/editor-panels/skin-glow/ui'

import { AiToolId } from '@/widgets/canvas-sidebar/model/types'
import { DrawingPanel } from '@/widgets/editor-panel'
import { UI_TEXT as DRAWING_PANEL_UI_TEXT } from '@/widgets/editor-panel/drawing-panel/model'

import { SelectDrawTools } from '@/features/select-draw-tools'
import { DrawTool, TOOL_TYPE } from '@/features/select-draw-tools/model'

interface SkinGlowProps {
  id: AiToolId | null
}

export const SkinGlow = (props: SkinGlowProps) => {
  const selectedColorBrushItem = useColorBrushStore(
    (state) => state.selectedColorBrushItem
  )
  const setSelectedColorBrushItem = useColorBrushStore(
    (state) => state.setSelectedColorBrushItem
  )

  const prefixContent = (
    <div>
      <SelectDrawTools
        toolType={TOOL_TYPE.SKIN_GLOW}
        selectedDrawTool={selectedColorBrushItem ?? null}
        onSelectDrawTool={(item: DrawTool) => setSelectedColorBrushItem(item)}
        tools={DUMMY_DATA}
        drawToolText={UI_TEXT.SKIN_GLOW}
      />
      <h4 className="mb-2 text-[1rem] text-neutral-7">
        {DRAWING_PANEL_UI_TEXT.SKIN_GLOW_SIZE}
      </h4>
      <SkinGlowSize />
    </div>
  )

  return (
    <DrawingPanel
      title={UI_TEXT.SKIN_GLOW}
      panelId={props.id ?? ''}
      prefixColors={prefixContent}
    />
  )
}
