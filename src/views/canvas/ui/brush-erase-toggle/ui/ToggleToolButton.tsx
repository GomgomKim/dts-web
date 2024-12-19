import React from 'react'

import { cn } from '@/shared/lib/utils'
import { Button } from '@/shared/ui'

interface ToggleToolButtonProps {
  icon: React.ReactNode
  text: string
  selected: boolean
  onClick: () => void
}

export const ToggleToolButton = ({
  icon,
  text,
  selected,
  onClick
}: ToggleToolButtonProps) => {
  return (
    <Button
      variant="ghost"
      onClick={onClick}
      className={cn(
        'flex h-10 w-24 flex-1',
        'gap-2 py-1.5 pl-1 pr-3',
        selected ? 'bg-white text-neutral-0' : 'bg-neutral-2 text-neutral-5',
        'hover:bg-white hover:text-neutral-0'
      )}
    >
      <div className="flex size-4">{icon}</div>
      <span className="text-[0.75rem] font-semibold">{text}</span>
    </Button>
  )
}
