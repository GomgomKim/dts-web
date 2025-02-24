import React from 'react'

import { useGlowStore } from '@/views/canvas/model/useEditorPanelsStore'
import {
  SkinGlowPower,
  SkinGlowSize
} from '@/views/canvas/ui/editor-panels/skin-glow/ui'

import { EditorPanel } from '@/shared/ui/editor-panel'
import { Switch } from '@/shared/ui/switch'

import { UI_TEXT } from './model/constants'

export const SkinGlow = () => {
  const isGlowVisible = useGlowStore((state) => state.isGlowVisible)
  const setIsGlowVisible = useGlowStore((state) => state.setIsGlowVisible)

  return (
    <EditorPanel title={UI_TEXT.SKIN_GLOW_TITLE} className="pb-8">
      <div>
        <h4 className="mb-2 mt-5 text-[1rem] text-neutral-7">
          {UI_TEXT.SKIN_GLOW_SIZE}
        </h4>
        <SkinGlowSize />
        <h4 className="mb-2 mt-5 text-[1rem] text-neutral-7">
          {UI_TEXT.SKIN_GLOW_POWER}
        </h4>
        <SkinGlowPower />
        <div className="mt-5 flex justify-between pt-3">
          <span className="text-[1rem] font-[500] leading-normal text-white">
            {UI_TEXT.SKIN_GLOW_CONTROLLER}
          </span>
          <div className="flex items-center gap-2">
            <span className="text-center text-[0.875rem] font-[500] leading-normal text-neutral-7">
              Show
            </span>
            <Switch
              className="h-[24px] w-[44px]"
              checked={isGlowVisible}
              onCheckedChange={() => setIsGlowVisible(!isGlowVisible)}
            />
          </div>
        </div>
      </div>
    </EditorPanel>
  )
}
