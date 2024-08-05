'use client'

import { useState, useEffect, useCallback, useRef } from 'react'

export type Box = {
  id: number
  image: string
  left: number
  top: number
  width: number
  height: number
  zIndex: number
}

type ActiveBox = Box & {
  offsetX: number
  offsetY: number
}

type ResizableAndDraggableBoxesProps = {
  containerRef: React.RefObject<HTMLElement>
  boxes: Box[]
  setBoxes: React.Dispatch<React.SetStateAction<Box[]>>
}

export const ResizableAndDraggableBoxes = ({
  containerRef,
  boxes,
  setBoxes
}: ResizableAndDraggableBoxesProps) => {
  const [activeBox, setActiveBox] = useState<ActiveBox | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [isResizing, setIsResizing] = useState(false)
  const [resizeDirection, setResizeDirection] = useState('')
  const boxRefs = useRef<Map<number, HTMLDivElement | null>>(new Map())

  const handleMouseDown = useCallback(
    (e: React.MouseEvent, boxId: number) => {
      const box = boxes.find((b) => b.id === boxId)
      if (!box) return

      const boxRect = e.currentTarget.getBoundingClientRect()
      const offsetX = e.clientX - boxRect.left
      const offsetY = e.clientY - boxRect.top

      setActiveBox({ ...box, offsetX, offsetY })

      const edgeThreshold = 10
      if (
        offsetX < edgeThreshold ||
        offsetY < edgeThreshold ||
        offsetX > boxRect.width - edgeThreshold ||
        offsetY > boxRect.height - edgeThreshold
      ) {
        setIsResizing(true)
        setResizeDirection(
          (offsetY < edgeThreshold ? 'n' : '') +
            (offsetY > boxRect.height - edgeThreshold ? 's' : '') +
            (offsetX < edgeThreshold ? 'w' : '') +
            (offsetX > boxRect.width - edgeThreshold ? 'e' : '')
        )
      } else {
        setIsDragging(true)
      }

      setBoxes((prevBoxes) => {
        const updatedBoxes = prevBoxes.map((box) =>
          box.id === boxId ? { ...box, zIndex: 10 } : { ...box, zIndex: 1 }
        )
        return updatedBoxes
      })
    },
    [boxes, setBoxes]
  )

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!activeBox || (!isDragging && !isResizing)) return
      if (!containerRef.current) return

      const containerRect = containerRef.current.getBoundingClientRect()
      const updatedBox = calculateNewBoxPosition(
        e,
        activeBox,
        containerRect,
        isDragging,
        isResizing,
        resizeDirection
      )

      setBoxes((prevBoxes) =>
        prevBoxes?.map((box) =>
          box.id === activeBox.id ? { ...box, ...updatedBox } : box
        )
      )
    },
    [activeBox, isDragging, isResizing, resizeDirection, containerRef, setBoxes]
  )

  const handleMouseUp = useCallback(() => {
    setIsDragging(false)
    setIsResizing(false)
  }, [])

  const handleClickOutside = (e: MouseEvent) => {
    const clickedInsideBox = Array.from(boxRefs.current.values()).some(
      (ref) => ref && ref.contains(e.target as Node)
    )
    if (!clickedInsideBox) {
      setActiveBox(null)
    }
  }

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    container.addEventListener('mousemove', handleMouseMove)
    container.addEventListener('mouseup', handleMouseUp)
    container.addEventListener('mouseleave', handleMouseUp)
    window.addEventListener('mousedown', handleClickOutside)

    return () => {
      container.removeEventListener('mousemove', handleMouseMove)
      container.removeEventListener('mouseup', handleMouseUp)
      container.removeEventListener('mouseleave', handleMouseUp)
      window.addEventListener('mousedown', handleClickOutside)
    }
  }, [handleMouseMove, handleMouseUp, containerRef])

  return (
    <>
      {boxes?.map((box) => (
        <div
          key={box.id}
          ref={(el) => {
            boxRefs.current.set(box.id, el)
          }}
          onMouseDown={(e) => handleMouseDown(e, box.id)}
          style={getBoxStyle(box, activeBox, isResizing, resizeDirection)}
        />
      ))}
    </>
  )
}

const calculateNewBoxPosition = (
  e: MouseEvent,
  activeBox: ActiveBox,
  containerRect: DOMRect,
  isDragging: boolean,
  isResizing: boolean,
  resizeDirection: string
): Box => {
  const newBox = { ...activeBox }

  if (isDragging) {
    newBox.left = e.clientX - containerRect.left - activeBox.offsetX
    newBox.top = e.clientY - containerRect.top - activeBox.offsetY
  } else if (isResizing) {
    if (resizeDirection.includes('e')) {
      newBox.width = e.clientX - containerRect.left - newBox.left
    }
    if (resizeDirection.includes('s')) {
      newBox.height = e.clientY - containerRect.top - newBox.top
    }
    if (resizeDirection.includes('w')) {
      const newWidth =
        newBox.width + (newBox.left - (e.clientX - containerRect.left))
      newBox.left = e.clientX - containerRect.left
      newBox.width = newWidth
    }
    if (resizeDirection.includes('n')) {
      const newHeight =
        newBox.height + (newBox.top - (e.clientY - containerRect.top))
      newBox.top = e.clientY - containerRect.top
      newBox.height = newHeight
    }
  }

  newBox.left = Math.max(
    0,
    Math.min(newBox.left, containerRect.width - newBox.width)
  )
  newBox.top = Math.max(
    0,
    Math.min(newBox.top, containerRect.height - newBox.height)
  )
  newBox.width = Math.max(
    50,
    Math.min(newBox.width, containerRect.width - newBox.left)
  )
  newBox.height = Math.max(
    50,
    Math.min(newBox.height, containerRect.height - newBox.top)
  )

  return newBox
}

const getBoxStyle = (
  box: Box,
  activeBox: ActiveBox | null,
  isResizing: boolean,
  resizeDirection: string
): React.CSSProperties => ({
  position: 'absolute',
  left: `${box.left}px`,
  top: `${box.top}px`,
  width: `${box.width}px`,
  height: `${box.height}px`,
  cursor:
    isResizing && activeBox?.id === box.id
      ? `${resizeDirection}-resize`
      : 'move',
  backgroundImage: `url(${box.image})`,
  backgroundSize: 'contain',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center',
  zIndex: box.zIndex || 1,
  outline: activeBox?.id === box.id ? '2px solid var(--primary)' : 'none'
})
