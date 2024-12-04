'use client'

import { useState } from 'react'

import { cn } from '@/shared/lib/utils'

interface DndBoxProps extends React.ComponentProps<'div'> {
  children: React.ReactNode
  onDropped: (e: React.DragEvent) => void
}

export const DndBox = ({ children, onDropped, ...props }: DndBoxProps) => {
  const { className, ...rest } = props
  const [isDragging, setIsDragging] = useState<boolean>(false)

  const handleDefaultEvent = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const onDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    handleDefaultEvent(e)
    setIsDragging(true)
  }
  const onDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    handleDefaultEvent(e)
    setIsDragging(false)
  }
  const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    handleDefaultEvent(e)
    setIsDragging(true)
  }
  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    handleDefaultEvent(e)
    setIsDragging(false)
    onDropped?.(e)
  }

  return (
    <div
      onDragEnter={onDragEnter}
      onDragLeave={onDragLeave}
      onDragOver={onDragOver}
      onDrop={onDrop}
      className={cn(
        'flex items-center justify-center rounded-sm bg-neutral-1/50',
        className,
        {
          'border border-primary': isDragging
        }
      )}
      {...rest}
    >
      {children}
    </div>
  )
}
