import React from 'react'

import { useHairColorStore } from '@/views/canvas/model/useEditorPanelsStore'
import { useLayerVisibilityStore } from '@/views/canvas/model/useLayerVisibilityStore'

import { UI_TEXT } from '@/features/control-editor/model'

import { Button } from '@/shared/ui'

import MagicPenIcon from '/public/icons/magic-pen.svg'

export const ControlEditor = () => {
  const isEditing = useHairColorStore((state) => state.isEditing)
  const activeToolVisibility = useLayerVisibilityStore(
    (state) => state.activeToolVisibility
  )
  const setActiveToolVisibility = useLayerVisibilityStore(
    (state) => state.setActiveToolVisibility
  )
  const setResetStatus = useLayerVisibilityStore(
    (state) => state.setResetStatus
  )
  return !isEditing ? (
    <div className="mt-5 flex h-[48px] w-full gap-[12px]">
      {/* Revert to Original */}
      <Button
        variant="destructive"
        size="medium"
        className="w-[169px] px-[20px] py-[12px]"
        onClick={() => setResetStatus(true)}
      >
        {UI_TEXT.REVERT_TO_ORIGINAL}
      </Button>

      {/* Turn On / Off */}
      <Button
        variant="outline"
        size="medium"
        className="flex-1 gap-[4px] bg-[#202124] px-[20px] py-[12px]"
        onClick={() => setActiveToolVisibility(!activeToolVisibility)}
      >
        <MagicPenIcon />
        {activeToolVisibility ? UI_TEXT.TURN_OFF : UI_TEXT.TURN_ON}
      </Button>
    </div>
  ) : null
}
