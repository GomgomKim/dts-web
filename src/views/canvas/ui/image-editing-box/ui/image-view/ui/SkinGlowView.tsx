import { useEffect, useRef, useState } from 'react'

import {
  useGlowStore,
  useSkinGlowStore
} from '@/views/canvas/model/useEditorPanelsStore'
import { useLayerVisibilityStore } from '@/views/canvas/model/useLayerVisibilityStore'

import { AI_TOOL } from '@/widgets/canvas-sidebar/model/types'

import { cn } from '@/shared/lib/utils'

import { useApplySkinGlow } from '../lib/useApplySkinGlow'

interface SkinGlowViewProps {
  modelMat: cv.Mat | null
  normalMat: cv.Mat | null
  maskMat: cv.Mat | null
}

export const SkinGlowView = (props: SkinGlowViewProps) => {
  const skinGlowSize = useSkinGlowStore((state) => state.skinGlowSize)
  const skinGlowPower = useSkinGlowStore((state) => state.skinGlowPower)
  const setActiveTool = useLayerVisibilityStore((state) => state.setActiveTool)
  const isGlowVisible = useGlowStore((state) => state.isGlowVisible)
  const activeToolVisibility = useLayerVisibilityStore(
    (state) => state.activeToolVisibility
  )
  const globalVisibility = useLayerVisibilityStore(
    (state) => state.globalVisibility
  )

  const [canvas, setCanvas] = useState<HTMLCanvasElement | null>(null)
  const [isDragging, setIsDragging] = useState<boolean>(false)
  const [lightPos, setLightPos] = useState<{ x: number; y: number }>({
    x: 50,
    y: 50
  })
  const ref = useRef<HTMLCanvasElement>(null)

  const isShowCursor = activeToolVisibility && globalVisibility && isGlowVisible

  const CURSOR_OFFSET = 20
  const GLOW_CURSOR_SIZE = 40

  const { applySkinGlow, throttledSkinGlow } = useApplySkinGlow({
    modelMat: props.modelMat,
    normalMat: props.normalMat,
    maskMat: props.maskMat,
    canvas: canvas
  })

  useEffect(() => {
    setActiveTool(AI_TOOL.SKIN_GLOW)
  }, [])

  useEffect(() => {
    applySkinGlow(lightPos.x, lightPos.y)
  }, [skinGlowSize, skinGlowPower])

  useEffect(() => {
    const canvasElement = (ref as React.RefObject<HTMLCanvasElement>).current
    if (canvasElement) {
      setCanvas(canvasElement)
    }
  }, [ref])

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = canvas?.getBoundingClientRect()
    if (!rect) return

    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    // 커서 근처에서 클릭했을 때만 드래그 시작
    const dx = x - lightPos.x
    const dy = y - lightPos.y
    const distance = Math.sqrt(dx * dx + dy * dy)

    if (distance < 40) {
      // 커서 크기(40px) 내에서 클릭 시
      setIsDragging(true)
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleMouseLeave = () => {
    setIsDragging(false)
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!canvas || !props.modelMat || !props.normalMat) return

    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    // 드래그 중일 때만 커서 이동 및 효과 적용
    if (isDragging) {
      setLightPos({ x, y })
      throttledSkinGlow(x, y)
    }
  }

  return (
    <div className={cn('relative size-full')}>
      <canvas
        ref={ref}
        className={cn('absolute left-0 top-0 z-50 size-full')}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        onMouseMove={handleMouseMove}
        style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
      />
      {/* 빛나는 커서 */}
      {isShowCursor && (
        <div
          style={{
            position: 'absolute',
            top: lightPos.y - CURSOR_OFFSET,
            left: lightPos.x - CURSOR_OFFSET,
            width: GLOW_CURSOR_SIZE,
            height: GLOW_CURSOR_SIZE,
            borderRadius: '50%',
            pointerEvents: 'none',
            // 더 밝고 강한 빛 효과
            boxShadow: `0 0 ${skinGlowSize}px ${skinGlowSize / 1.5}px rgba(255, 255, 255, 0.5), 
                       0 4px 40px rgba(255, 255, 255, 0.8)`,
            background: isDragging
              ? 'radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(255,255,255,0.9) 50%, rgba(255,255,255,0) 100%)'
              : 'radial-gradient(circle, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.8) 50%, rgba(255,255,255,0) 100%)',
            border: '4px solid #FFF',
            zIndex: 50
          }}
        />
      )}
    </div>
  )
}
