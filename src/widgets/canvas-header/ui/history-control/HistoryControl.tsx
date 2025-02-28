'use client'

import { useGlobalHistoryStore } from '@/views/canvas/model/useGlobalHistoryStore'

import { Button } from '@/shared/ui'

import UndoIcon from '/public/icons/corner-up-left.svg'
import RestoreIcon from '/public/icons/refresh.svg'

export const HistoryControl = () => {
  const undo = useGlobalHistoryStore((state) => state.undo)
  const redo = useGlobalHistoryStore((state) => state.redo)
  const currentIndex = useGlobalHistoryStore((state) => state.currentIndex)
  const globalHistory = useGlobalHistoryStore((state) => state.globalHistory)
  const isUndoable = currentIndex > 0
  const isRedoable = currentIndex < globalHistory.length - 1

  const handleUndo = () => {
    undo()
  }

  const handleRedo = () => {
    redo()
  }

  return (
    <div className="flex gap-2">
      <Button
        variant="ghost"
        size="icon"
        className="group size-8 rounded bg-inherit"
        onClick={handleUndo}
        disabled={!isUndoable}
      >
        <UndoIcon className="stroke-current group-hover:stroke-white group-disabled:stroke-neutral-3" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="group size-8 rounded bg-inherit"
        onClick={handleRedo}
        disabled={!isRedoable}
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
