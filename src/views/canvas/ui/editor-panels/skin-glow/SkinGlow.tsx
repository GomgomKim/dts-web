import React from 'react'

import {
  SkinGlowPower,
  SkinGlowSize
} from '@/views/canvas/ui/editor-panels/skin-glow/ui'

import { EditorPanel } from '@/shared/ui/editor-panel'

import { UI_TEXT } from './model/constants'

export const SkinGlow = () => {
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
      </div>
    </EditorPanel>
  )
}
