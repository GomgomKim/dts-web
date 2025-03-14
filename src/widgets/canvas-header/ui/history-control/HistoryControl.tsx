'use client'

// import { useSearchParams } from 'next/navigation'
// import { useEditorStore } from '@/views/_generate/model/useEditorHistoryStore'
import { Button } from '@/shared/ui'

import UndoIcon from '/public/icons/corner-up-left.svg'
import RestoreIcon from '/public/icons/refresh.svg'

export const HistoryControl = () => {
  // const searchParams = useSearchParams()

  // const variationId = searchParams.get('variationId') || '1'

  // const editedVariationList = useEditorStore((state) => state.items)
  // const { undo, redo, applyEdit } = useEditorStore.getState()

  // if (!variationId) {
  //   console.log('variationId is not found')
  //   return null
  // }

  // const hasPast = editedVariationList.has(variationId)
  //   ? editedVariationList.get(variationId)!.past.length > 0
  //   : false
  // const hasFuture = editedVariationList.has(variationId)
  //   ? editedVariationList.get(variationId)!.future.length > 0
  //   : false

  // const handleUndo = () => {
  //   undo(variationId)
  // }

  // const handleRedo = () => {
  //   redo(variationId)
  // }

  // const handleRestore = () => {
  //   const present = editedVariationList.get(variationId)?.present
  //   if (present?.ratio === 'ASPECT_RATIO_9_16') {
  //     return
  //   }
  //   applyEdit(variationId, { ratio: 'ASPECT_RATIO_9_16' })
  // }

  return (
    <div className="flex gap-2">
      <Button
        variant="ghost"
        size="icon"
        className="group size-8 rounded bg-inherit"
        // onClick={handleUndo}
        // disabled={!hasPast}
      >
        <UndoIcon className="stroke-current group-hover:stroke-white group-disabled:stroke-neutral-3" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="group size-8 rounded bg-inherit"
        // onClick={handleRedo}
        // disabled={!hasFuture}
      >
        <UndoIcon className="-scale-x-100 stroke-current group-hover:stroke-white group-disabled:stroke-neutral-3" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="group size-8 rounded bg-inherit"
        // onClick={handleRestore}
        // disabled={!editedVariationList.has(variationId)}
      >
        <RestoreIcon className="stroke-current group-hover:stroke-white group-disabled:stroke-neutral-3" />
      </Button>
    </div>
  )
}
