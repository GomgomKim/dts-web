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
        'flex h-10 flex-1 items-center justify-center gap-2 rounded px-3 py-1.5 pl-1',
        selected ? 'bg-white text-neutral-0' : 'bg-neutral-2 text-neutral-5',
        'hover:bg-white hover:text-[#0F1011]'
      )}
    >
      <div className="flex size-4">{icon}</div>
      <span className="text-[0.75rem] font-semibold">{text}</span>
    </Button>
  )
}
