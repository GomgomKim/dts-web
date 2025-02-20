import React from 'react'

import { cn } from '@/shared/lib/utils'
import { Button } from '@/shared/ui/button/Button'

import AddMaskIcon from '/public/icons/add-mask.svg'
import RemoveMaskIcon from '/public/icons/remove-mask.svg'

import { useHairColorStore } from '../../model/useEditorPanelsStore'
import { TOOL_IDS, TOOL_MODE, UI_TEXT } from './model'
import { AddRemoveSize } from './ui'

export const AddRemoveToggle = () => {
  const selectedToolId = useHairColorStore((state) => state.selectedToolId)
  const setSelectedToolId = useHairColorStore(
    (state) => state.setSelectedToolId
  )

  const handleClickAddRemove = (tool: TOOL_MODE) => {
    setSelectedToolId(tool)
  }

  const isEditing = useHairColorStore((state) => state.isEditing)
  const setIsEditing = useHairColorStore((state) => state.setIsEditing)

  const toggleEditing = () => {
    if (isEditing) {
      setSelectedToolId(null)
    }
    if (!isEditing) {
      setSelectedToolId(TOOL_IDS.ADD_MASK)
    }
    setIsEditing(!isEditing)
  }

  const isAddMaskSelected = selectedToolId === TOOL_IDS.ADD_MASK
  const isRemoveMaskSelected = selectedToolId === TOOL_IDS.REMOVE_MASK

  return (
    <div
      className={cn(
        'flex items-center',
        'h-16 w-[600px]',
        'gap-4 pl-8 pr-3',
        'rounded-[100px] border border-neutral-2 bg-neutral-1'
      )}
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
      <h4 className="text-[0.875rem] font-medium text-neutral-7">
        {UI_TEXT.MASK_TITLE}
      </h4>
      <div
        className={cn(
          'flex',
          'h-12 w-[12.5rem]',
          'p-1',
          'rounded-[100px] bg-neutral-2'
        )}
      >
        {/* ADD MASK 버튼 */}
        <Button
          variant="ghost"
          disabled={!isEditing}
          onClick={() => handleClickAddRemove(TOOL_IDS.ADD_MASK)}
          className={cn(
            'flex h-10 gap-2 rounded-[100px] px-[16px] py-[6px]',
            isAddMaskSelected
              ? 'bg-white text-neutral-0 hover:bg-white hover:text-neutral-0'
              : 'bg-neutral-2 text-neutral-5 hover:bg-white hover:text-neutral-0'
          )}
          isActive={isAddMaskSelected}
        >
          <AddMaskIcon />
          <span className="text-[0.75rem] font-semibold">
            {UI_TEXT.ADD_MASK}
          </span>
        </Button>

        {/* REMOVE MASK 버튼 */}
        <Button
          variant="ghost"
          disabled={!isEditing}
          onClick={() => handleClickAddRemove(TOOL_IDS.REMOVE_MASK)}
          className={cn(
            'flex h-10 gap-2 rounded-[100px] px-[16px] py-[6px]',
            isRemoveMaskSelected
              ? 'bg-white text-neutral-0 hover:bg-white hover:text-neutral-0'
              : 'bg-neutral-2 text-neutral-5 hover:bg-white hover:text-neutral-0'
          )}
        >
          <RemoveMaskIcon />
          <span className="text-[0.75rem] font-semibold">
            {UI_TEXT.REMOVE_MASK}
          </span>
        </Button>
      </div>

      <h4 className="text-[0.875rem] font-medium text-neutral-5">
        {UI_TEXT.SIZE}
      </h4>
      <AddRemoveSize />
      <div className="ml-auto">
        <Button
          variant="ghost"
          onClick={toggleEditing}
          className={cn(
            'flex h-[40px] w-[103px] gap-[10px] rounded-[100px] px-[20px] py-[12px]',
            isEditing
              ? 'bg-primary hover:!bg-primary hover:!text-neutral-0'
              : 'bg-white hover:!bg-white hover:!text-neutral-0'
          )}
        >
          <span className="text-[14px] font-medium text-neutral-0">
            {isEditing ? UI_TEXT.EDIT_DONE : UI_TEXT.EDIT_MASK}
          </span>
        </Button>
      </div>
    </div>
  )
}
