import { useCallback, useEffect, useRef, useState } from 'react'

import Image from 'next/image'

import { cn } from '@/shared/lib/utils'

import { Box } from '../../types'
import './styles.css'

interface ResizableAndDraggableBoxesProps {
  containerRef: React.RefObject<HTMLElement>
  boxes: Box[]
  boxRefs: React.MutableRefObject<Map<string, HTMLDivElement | null>>
  onKeydownRemoveBrandAsset: (boxId: string) => void
}

export const ResizableAndDraggableBoxes = ({
  containerRef,
  boxes,
  boxRefs,
  onKeydownRemoveBrandAsset
}: ResizableAndDraggableBoxesProps) => {
  const [activeBoxId, setActiveBoxId] = useState<string | null>(
    () => boxes[0]?.id || null
  )
  const [isDragging, setIsDragging] = useState(false)
  const [isResizing, setIsResizing] = useState(false)
  const [resizeDirection, setResizeDirection] = useState('')
  const offsetRef = useRef({ x: 0, y: 0 })

  const handleMouseDown = (
    e: React.MouseEvent | React.TouchEvent,
    boxId: string
  ) => {
    e.preventDefault()
    const boxRef = boxRefs.current.get(boxId)
    if (!boxRef) return

    const boxRect = boxRef.getBoundingClientRect()

    // 박스의 중심 좌표 계산
    const boxCenterX = boxRect.left + boxRect.width / 2
    const boxCenterY = boxRect.top + boxRect.height / 2

    let clientX: number
    let clientY: number

    if ('touches' in e) {
      // Touch event
      if (e.touches.length > 0) {
        clientX = e.touches[0].clientX
        clientY = e.touches[0].clientY
      } else {
        return // 유효하지 않은 터치 이벤트
      }
    } else {
      // Mouse event
      clientX = e.clientX
      clientY = e.clientY
    }

    // 마우스 위치와 박스 중심 간의 오프셋 계산
    offsetRef.current.x = clientX - boxCenterX
    offsetRef.current.y = clientY - boxCenterY

    const edgeThreshold = 15
    const relativeX = clientX - boxRect.left
    const relativeY = clientY - boxRect.top

    if (
      relativeX < edgeThreshold ||
      relativeY < edgeThreshold ||
      relativeX > boxRect.width - edgeThreshold ||
      relativeY > boxRect.height - edgeThreshold
    ) {
      setIsResizing(true)
      setResizeDirection(
        (relativeY < edgeThreshold ? 'n' : '') +
          (relativeY > boxRect.height - edgeThreshold ? 's' : '') +
          (relativeX < edgeThreshold ? 'w' : '') +
          (relativeX > boxRect.width - edgeThreshold ? 'e' : '')
      )
    } else {
      setIsDragging(true)
      setActiveBoxId(boxId)
    }
  }

  const handleMouseMove = useCallback(
    (e: MouseEvent | TouchEvent) => {
      // if (!('touches' in e)) {
      e.preventDefault()
      // }

      if (!activeBoxId || (!isDragging && !isResizing)) return
      if (!containerRef.current) return

      const boxRef = boxRefs.current.get(activeBoxId)
      if (!boxRef) return

      const containerRect = containerRef.current.getBoundingClientRect()
      const containerCenterX = containerRect.width / 2
      const containerCenterY = containerRect.height / 2

      let clientX: number
      let clientY: number

      if ('touches' in e) {
        if (e.touches.length > 0) {
          clientX = e.touches[0].clientX
          clientY = e.touches[0].clientY
        } else {
          return // 유효하지 않은 터치 이벤트
        }
      } else {
        clientX = e.clientX
        clientY = e.clientY
      }

      if (isDragging) {
        const newCenterX = clientX - containerRect.left - offsetRef.current.x
        const newCenterY = clientY - containerRect.top - offsetRef.current.y

        // 컨테이너 경계 내에서 이동할 수 있도록 제한
        const limitedCenterX = Math.max(
          boxRef.offsetWidth / 2,
          Math.min(newCenterX, containerRect.width - boxRef.offsetWidth / 2)
        )
        const limitedCenterY = Math.max(
          boxRef.offsetHeight / 2,
          Math.min(newCenterY, containerRect.height - boxRef.offsetHeight / 2)
        )

        // 박스 위치 업데이트 (중심 기준)
        const relativeX = limitedCenterX - containerCenterX
        const relativeY = limitedCenterY - containerCenterY
        boxRef.style.left = `calc(50% + ${relativeX - boxRef.offsetWidth / 2}px)`
        boxRef.style.top = `calc(50% + ${relativeY - boxRef.offsetHeight / 2}px)`
      } else if (isResizing) {
        const boxStyle = boxRef.style
        let newLeft = boxRef.offsetLeft
        let newTop = boxRef.offsetTop
        let newWidth = boxRef.offsetWidth
        let newHeight = boxRef.offsetHeight

        const boxRect = boxRef.getBoundingClientRect()

        if (resizeDirection.includes('e')) {
          newWidth = clientX - boxRect.left
        }
        if (resizeDirection.includes('s')) {
          newHeight = clientY - boxRect.top
        }
        if (resizeDirection.includes('w')) {
          const widthChange = boxRect.left - clientX
          newLeft -= widthChange
          newWidth += widthChange
        }
        if (resizeDirection.includes('n')) {
          const heightChange = boxRect.top - clientY
          newTop -= heightChange
          newHeight += heightChange
        }

        // 최소 크기 제한
        newWidth = Math.max(50, newWidth)
        newHeight = Math.max(50, newHeight)

        // 컨테이너 경계 내에서 리사이징할 수 있도록 제한
        newTop = Math.max(0, newTop)
        // newLeft = Math.max(0, newLeft)
        newWidth = Math.min(newWidth, containerRect.width - newLeft)
        newHeight = Math.min(newHeight, containerRect.height - boxRef.offsetTop)

        // 박스 크기와 위치 업데이트
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
    const clickedInsideBox = Array.from(boxRefs.current.values()).some(
      (ref) => ref && ref.contains(e.target as Node)
    )
    if (!clickedInsideBox) {
      setActiveBoxId(null)
    }
  }

  const handleKeyDown = (eKey: string, boxId: string) => {
    if (eKey === 'Escape' || eKey === 'Delete' || eKey === 'Backspace') {
      onKeydownRemoveBrandAsset(boxId)
    }
  }

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    container.addEventListener('mousemove', handleMouseMove)
    container.addEventListener('mouseup', handleMouseUp)
    container.addEventListener('mouseleave', handleMouseUp)
    //
    window.addEventListener('mousedown', handleClickOutside)
    //
    container.addEventListener('touchmove', handleMouseMove)
    container.addEventListener('touchend', handleMouseUp)
    container.addEventListener('touchcancel', handleMouseUp)

    return () => {
      container.removeEventListener('mousemove', handleMouseMove)
      container.removeEventListener('mouseup', handleMouseUp)
      container.removeEventListener('mouseleave', handleMouseUp)
      //
      window.removeEventListener('mousedown', handleClickOutside)
      //
      container.removeEventListener('touchmove', handleMouseMove)
      container.removeEventListener('touchend', handleMouseUp)
      container.removeEventListener('touchcancel', handleMouseUp)
    }
  }, [containerRef, handleMouseMove, handleMouseUp, handleClickOutside])

  useEffect(() => {
    if (boxes.length === 0) return
    if (boxes.some((box) => box.id === 'product')) setActiveBoxId('product')
    else setActiveBoxId('logo')
  }, [boxes])

  useEffect(() => {
    if (activeBoxId && boxRefs.current.has(activeBoxId)) {
      boxRefs.current.get(activeBoxId)?.focus()
    }
  }, [activeBoxId])

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
            tabIndex={0}
            onFocus={() => setActiveBoxId(box.id)}
            onBlur={() => setActiveBoxId(null)}
            onMouseDown={(e) => handleMouseDown(e, box.id)}
            onTouchStart={(e) => handleMouseDown(e, box.id)}
            onKeyDown={(e) => {
              if (box.id !== activeBoxId) return
              handleKeyDown(e.key, box.id)
            }}
            className="resizable-div"
            style={{
              position: 'absolute',
              left: `calc(50% + ${box.centerX - box.width / 2}px)`,
              bottom: box.centerY, // initial bottom distance
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
            <ActiveBorder isActive={activeBoxId === box.id} />
          </div>
        )
      })}
    </>
  )
}

const ActiveBorder = ({ isActive }: { isActive: boolean }) => {
  return (
    <>
      <span
        className={cn('absolute top-0 w-full', {
          ["before:content-[''] before:absolute before:top-[-10px] before:left-[-10px] before:w-5 before:h-5 before:rounded-full before:bg-primary"]:
            isActive,
          ["after:content-[''] after:absolute after:top-[-10px] after:right-[-10px] after:w-5 after:h-5 after:rounded-full after:bg-primary"]:
            isActive
        })}
      ></span>
      <span
        className={cn('absolute bottom-0 w-full', {
          ["before:content-[''] before:absolute before:bottom-[-10px] before:left-[-10px] before:w-5 before:h-5 before:rounded-full before:bg-primary"]:
            isActive,
          ["after:content-[''] after:absolute after:bottom-[-10px] after:right-[-10px] after:w-5 after:h-5 after:rounded-full after:bg-primary"]:
            isActive
        })}
      ></span>
    </>
  )
}
