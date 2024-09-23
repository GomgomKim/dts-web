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
  const undo = useEditorStore((state) => state.undo)
  const redo = useEditorStore((state) => state.redo)

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

  // TODO: restore 기능 구현
  const handleRestore = () => {
    console.log('restore clicked')
    // present가 초기값이면 적용하지 않음
    // present가 초기값이 아니면 초기값으로 되돌림
  }

  return (
    <div className="flex gap-1">
      <Button
        variant="ghost"
        size="icon"
        className="bg-inherit h-8 w-8 rounded-[0.25rem]"
        onClick={handleUndo}
        disabled={!hasPast}
      >
        <UndoIcon stroke="#AEAFB5" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="bg-inherit h-8 w-8 rounded-[0.25rem]"
        onClick={handleRedo}
        disabled={!hasFuture}
      >
        <UndoIcon stroke="#AEAFB5" className="-scale-x-100" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="bg-inherit h-8 w-8 rounded-[0.25rem]"
        onClick={handleRestore}
        // present가 초기값이면 disabled
      >
        <RestoreIcon stroke="#AEAFB5" />
      </Button>
    </div>
  )
}
