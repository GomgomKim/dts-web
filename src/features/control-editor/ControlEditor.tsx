import React from 'react'

import { UI_TEXT } from '@/features/control-editor/model'

import { Button } from '@/shared/ui'

import MagicPenIcon from '/public/icons/magic-pen.svg'

export const ControlEditor = () => {
  return (
    <div className="mt-5 flex h-[48px] w-full gap-[12px]">
      {/* Revert to Original */}
      <Button
        variant="destructive"
        size="medium"
        className="w-[169px] px-[20px] py-[12px]"
      >
        {UI_TEXT.REVERT_TO_ORIGINAL}
      </Button>

      {/* Turn Off */}
      <Button
        variant="outline"
        size="medium"
        className="flex-1 gap-[4px] bg-[#202124] px-[20px] py-[12px]"
      >
        <MagicPenIcon />
        {UI_TEXT.TURN_OFF}
      </Button>
    </div>
  )
}
