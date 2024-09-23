import { Button } from '@/shared/ui'

import UndoIcon from '/public/icons/corner-up-left.svg'
import RestoreIcon from '/public/icons/refresh.svg'

export const HistoryControl = () => {
  const hasFuture = true
  const hasPast = true
  return (
    <div className="flex gap-1">
      <Button
        variant="ghost"
        size="icon"
        className="bg-inherit h-8 w-8 rounded-[0.25rem]"
        onClick={() => console.log('undo clicked')}
        disabled={!hasPast}
      >
        <UndoIcon stroke="#AEAFB5" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="bg-inherit h-8 w-8 rounded-[0.25rem]"
        onClick={() => console.log('redo clicked')}
        disabled={!hasFuture}
      >
        <UndoIcon stroke="#AEAFB5" className="-scale-x-100" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="bg-inherit h-8 w-8 rounded-[0.25rem]"
        onClick={() => console.log('restore clicked')}
      >
        <RestoreIcon stroke="#AEAFB5" />
      </Button>
    </div>
  )
}
