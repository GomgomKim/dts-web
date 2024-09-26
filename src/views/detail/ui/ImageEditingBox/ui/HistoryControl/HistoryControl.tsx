'use client'

import { useSearchParams } from 'next/navigation'

import { useEditorStore } from '@/views/detail/model/useEditorHistoryStore'

import { Button } from '@/shared/ui'

import UndoIcon from '/public/icons/corner-up-left.svg'
import RestoreIcon from '/public/icons/refresh.svg'

export const HistoryControl = () => {
  const searchParams = useSearchParams()

  const variationId = searchParams.get('variationId')

  const editedVariationList = useEditorStore((state) => state.items)
  const { undo, redo, applyEdit } = useEditorStore.getState()

  if (!variationId) {
    console.log('variationId is not found')
    return null
  }

  const hasPast = editedVariationList.has(variationId)
    ? editedVariationList.get(variationId)!.past.length > 0
    : false
  const hasFuture = editedVariationList.has(variationId)
    ? editedVariationList.get(variationId)!.future.length > 0
    : false

  const handleUndo = () => {
    undo(variationId)
  }

  const handleRedo = () => {
    redo(variationId)
  }

  const handleRestore = () => {
    const present = editedVariationList.get(variationId)?.present
    if (present?.angle === 'FRONT' && present?.ratio === 'ASPECT_RATIO_9_16') {
      return
    }
    applyEdit(variationId, { ratio: 'ASPECT_RATIO_9_16', angle: 'FRONT' })
  }

  return (
    <div className="flex gap-1 svg-color-parent">
      <Button
        variant="ghost"
        size="icon"
        className="bg-inherit h-8 w-8 rounded-[0.25rem]"
        onClick={handleUndo}
        disabled={!hasPast}
      >
        <UndoIcon />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="bg-inherit h-8 w-8 rounded-[0.25rem]"
        onClick={handleRedo}
        disabled={!hasFuture}
      >
        <UndoIcon className="-scale-x-100" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="bg-inherit h-8 w-8 rounded-[0.25rem]"
        onClick={handleRestore}
        disabled={!editedVariationList.has(variationId)}
      >
        <RestoreIcon />
      </Button>
    </div>
  )
}
