import { useColorBrushStore } from '@/views/canvas/model/useEditorPanelsStore'
import { UI_TEXT } from '@/views/canvas/ui/editor-panels/color-brush/model'

import { Switch } from '@/shared/ui/switch'

export const AutoSelectToggle = () => {
  const isAutoSelect = useColorBrushStore((state) => state.isAutoSelect)
  const setIsAutoSelect = useColorBrushStore((state) => state.setIsAutoSelect)

  return (
    <div className="flex items-center gap-2">
      <span className="text-[0.875rem] text-secondary-foreground">
        {UI_TEXT.AUTO_SELECT}
      </span>
      <Switch
        checked={isAutoSelect}
        onCheckedChange={() => setIsAutoSelect(!isAutoSelect)}
      />
    </div>
  )
}
