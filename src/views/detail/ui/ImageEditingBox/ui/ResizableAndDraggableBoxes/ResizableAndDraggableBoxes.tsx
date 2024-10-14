import { useCallback, useEffect, useRef, useState } from 'react'

import Image from 'next/image'

import { cn } from '@/shared/lib/utils'

import { Box } from '../../types'

interface ResizableAndDraggableBoxesProps {
  containerRef: React.RefObject<HTMLElement>
  boxes: Box[]
  setBoxes: React.Dispatch<React.SetStateAction<Box[]>>
  boxRefs: React.MutableRefObject<Map<string, HTMLDivElement | null>>
}

export const ResizableAndDraggableBoxes = ({
  containerRef,
  boxes,
  boxRefs
}: ResizableAndDraggableBoxesProps) => {
  const [activeBoxId, setActiveBoxId] = useState<string | null>(
    () => boxes[0]?.id || null
  )
  const [isDragging, setIsDragging] = useState(false)
  const [isResizing, setIsResizing] = useState(false)
  const [resizeDirection, setResizeDirection] = useState('')
  const offsetRef = useRef({ x: 0, y: 0 })

  const handleMouseDown = (e: React.MouseEvent, boxId: string) => {
    e.preventDefault()
    const boxRef = boxRefs.current.get(boxId)
    if (!boxRef) return

    const boxRect = boxRef.getBoundingClientRect()
    offsetRef.current.x = e.clientX - boxRect.left
    offsetRef.current.y = e.clientY - boxRect.top

    const edgeThreshold = 10
    if (
      offsetRef.current.x < edgeThreshold ||
      offsetRef.current.y < edgeThreshold ||
      offsetRef.current.x > boxRect.width - edgeThreshold ||
      offsetRef.current.y > boxRect.height - edgeThreshold
    ) {
      setIsResizing(true)
      setResizeDirection(
        (offsetRef.current.y < edgeThreshold ? 'n' : '') +
          (offsetRef.current.y > boxRect.height - edgeThreshold ? 's' : '') +
          (offsetRef.current.x < edgeThreshold ? 'w' : '') +
          (offsetRef.current.x > boxRect.width - edgeThreshold ? 'e' : '')
      )
    } else {
      setIsDragging(true)
      setActiveBoxId(boxId)
    }
  }

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      e.preventDefault()
      if (!activeBoxId || (!isDragging && !isResizing)) return
      if (!containerRef.current) return

      const boxRef = boxRefs.current.get(activeBoxId)
      if (!boxRef) return

      const containerRect = containerRef.current.getBoundingClientRect()

      if (isDragging) {
        let newLeft = e.clientX - containerRect.left - offsetRef.current.x
        let newTop = e.clientY - containerRect.top - offsetRef.current.y

        // 컨테이너 경계 내에서 이동할 수 있도록 제한
        newLeft = Math.max(
          0,
          Math.min(newLeft, containerRect.width - boxRef.offsetWidth)
        )
        newTop = Math.max(
          0,
          Math.min(newTop, containerRect.height - boxRef.offsetHeight)
        )

        // 박스 위치 업데이트
        boxRef.style.left = `${newLeft}px`
        boxRef.style.top = `${newTop}px`
      } else if (isResizing) {
        const boxStyle = boxRef.style
        let newLeft = boxRef.offsetLeft
        let newTop = boxRef.offsetTop
        let newWidth = boxRef.offsetWidth
        let newHeight = boxRef.offsetHeight

        if (resizeDirection.includes('e')) {
          newWidth = e.clientX - containerRect.left - newLeft
        }
        if (resizeDirection.includes('s')) {
          newHeight = e.clientY - containerRect.top - newTop
        }
        if (resizeDirection.includes('w')) {
          const widthAdjustment = newLeft - (e.clientX - containerRect.left)
          newLeft = e.clientX - containerRect.left
          newWidth += widthAdjustment
        }
        if (resizeDirection.includes('n')) {
          const heightAdjustment = newTop - (e.clientY - containerRect.top)
          newTop = e.clientY - containerRect.top
          newHeight += heightAdjustment
        }

        // 컨테이너 경계 내에서 리사이징할 수 있도록 제한
        newLeft = Math.max(0, Math.min(newLeft, containerRect.width - newWidth))
        newTop = Math.max(0, Math.min(newTop, containerRect.height - newHeight))
        newWidth = Math.max(
          50,
          Math.min(newWidth, containerRect.width - newLeft)
        )
        newHeight = Math.max(
          50,
          Math.min(newHeight, containerRect.height - newTop)
        )

        // 박스 스타일 업데이트
        boxStyle.left = `${newLeft}px`
        boxStyle.top = `${newTop}px`
        boxStyle.width = `${newWidth}px`
        boxStyle.height = `${newHeight}px`
      }
    },
    [activeBoxId, isDragging, isResizing, resizeDirection, containerRef]
  )

  const handleMouseUp = useCallback(() => {
    setIsDragging(false)
    setIsResizing(false)
  }, [])

  const handleClickOutside = (e: MouseEvent) => {
    e.preventDefault()
    const clickedInsideBox = Array.from(boxRefs.current.values()).some(
      (ref) => ref && ref.contains(e.target as Node)
    )
    if (!clickedInsideBox) {
      setActiveBoxId(null)
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
  }, [containerRef, handleMouseMove, handleMouseUp, handleClickOutside])

  useEffect(() => {
    if (boxes.length === 0) return
    if (boxes.some((box) => box.id === 'product')) setActiveBoxId('product')
    else setActiveBoxId('logo')
  }, [boxes])

  return (
    <>
      {boxes.map((box) => {
        return (
          <div
            key={box.id + box.createdAt}
            ref={(el) => {
              if (el) {
                boxRefs.current.set(box.id, el)
              }
            }}
            onMouseDown={(e) => handleMouseDown(e, box.id)}
            style={{
              position: 'absolute',
              bottom: `${box.bottom}px`,
              left:
                box.left === undefined
                  ? `calc(50% - ${box.width / 2}px)` // 상위 컨테이너 가운데에 위치
                  : `${box.left}px`,
              width: `${box.width}px`,
              height: `${box.height}px`,
              zIndex: activeBoxId === box.id ? 2 : 1,
              cursor:
                isResizing && activeBoxId === box.id
                  ? `${resizeDirection}-resize`
                  : 'move',
              outline:
                activeBoxId === box.id ? '2px solid var(--primary)' : 'none'
            }}
          >
            <div className="w-full h-full">
              <Image
                src={box.image}
                alt=""
                fill
                style={{ objectFit: 'contain' }}
              />
            </div>
            <span
              className={cn('absolute top-0 w-full', {
                ["before:content-[''] before:absolute before:top-[-4px] before:left-[-4px] before:w-2 before:h-2 before:rounded-full before:bg-primary"]:
                  activeBoxId === box.id,
                ["after:content-[''] after:absolute after:top-[-4px] after:right-[-4px] after:w-2 after:h-2 after:rounded-full after:bg-primary"]:
                  activeBoxId === box.id
              })}
            ></span>
            <span
              className={cn('absolute bottom-0 w-full', {
                ["before:content-[''] before:absolute before:bottom-[-4px] before:left-[-4px] before:w-2 before:h-2 before:rounded-full before:bg-primary"]:
                  activeBoxId === box.id,
                ["after:content-[''] after:absolute after:bottom-[-4px] after:right-[-4px] after:w-2 after:h-2 after:rounded-full after:bg-primary"]:
                  activeBoxId === box.id
              })}
            ></span>
          </div>
        )
      })}
    </>
  )
}
