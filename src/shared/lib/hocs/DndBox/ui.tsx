'use client'

import { cn } from '@/shared/lib/utils'
import { useEffect, useState } from 'react'

interface DndBoxProps extends React.ComponentProps<'div'> {
  children: React.ReactNode
  width: string
  height?: string
  onDropped: (e: React.DragEvent) => void
}

export const DndBox = ({
  children,
  width,
  height,
  onDropped,
  ...props
}: DndBoxProps) => {
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

  useEffect(() => {
    console.log(isDragging)
  }, [isDragging])

  return (
    <div
      onDragEnter={onDragEnter}
      onDragLeave={onDragLeave}
      onDragOver={onDragOver}
      onDrop={onDrop}
      className={cn(
        'flex justify-center items-center border border-neutral-3 rounded-sm bg-neutral-1 bg-opacity-50',
        className,
        {
          'border-primary': isDragging
        }
      )}
      style={{ width, height }}
      {...rest}
    >
      {children}
    </div>
  )
}
