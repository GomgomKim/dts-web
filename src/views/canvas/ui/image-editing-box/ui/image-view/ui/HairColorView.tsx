import { useEffect, useMemo, useRef, useState } from 'react'

import { useEditModeStore } from '@/views/canvas/model/useEditModeStore'
import {
  useColorChangeStore,
  useHairColorStore
} from '@/views/canvas/model/useEditorPanelsStore'
import { useGlobalHistoryStore } from '@/views/canvas/model/useGlobalHistoryStore'
import { useLayerVisibilityStore } from '@/views/canvas/model/useLayerVisibilityStore'
import { TOOL_IDS } from '@/views/canvas/ui/add-remove-toggle/model'

import { AI_TOOL } from '@/widgets/canvas-sidebar/model/types'

import { cn } from '@/shared/lib/utils'

import { useApplyHairColor } from '../lib/useApplyHairColor'
import { useHairHighlight } from '../lib/useHairHighlight'
import { useLayersStore } from '../lib/useLayersStore'

type HairColorViewProps = {
  modelMat: cv.Mat | null
  maskMatRef: React.MutableRefObject<cv.Mat | null>
}

export const HairColorView = (props: HairColorViewProps) => {
  const hairColor = useHairColorStore((state) => state.hairColor)
  const memoizedHairColor = useMemo(
    () => hairColor,
    [JSON.stringify(hairColor)]
  )
  const hairColorOpacity = useHairColorStore((state) => state.hairColorOpacity)
  const memoizedHairColorOpacity = useMemo(
    () => hairColorOpacity,
    [JSON.stringify(hairColorOpacity)]
  )
  const hairColorLevel = useHairColorStore((state) => state.hairColorLevel)
  const memoizedHairColorLevel = useMemo(
    () => hairColorLevel,
    [JSON.stringify(hairColorLevel)]
  )
  const selectedToolId = useHairColorStore((state) => state.selectedToolId)
  const isEditing = useHairColorStore((state) => state.isEditing)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const { toolSize } = useEditModeStore()
  const [isMouseDown, setIsMouseDown] = useState(false)
  const setActiveTool = useLayerVisibilityStore((state) => state.setActiveTool)
  const ref = useRef<HTMLCanvasElement>(null)

  const resetStatus = useLayersStore((state) => state.resetStatus)

  const originalMaskMatRef = useRef<cv.Mat | null>(null)

  const isFirstRender = useRef<boolean>(true)

  const history = useGlobalHistoryStore((state) => state.globalHistory)
  const currentIndex = useGlobalHistoryStore((state) => state.currentIndex)
  const currentEntry = history[currentIndex]

  const colorChangeStatus = useColorChangeStore(
    (state) => state.colorChangeStatus
  )

  useEffect(() => {
    if (currentEntry && currentEntry.mat) {
      props.maskMatRef.current = currentEntry.mat.clone()
    }
  }, [currentEntry])

  // 얼굴 부위별 호버
  const { drawHairHighlight } = useHairHighlight({
    canvasRef: ref as React.RefObject<HTMLCanvasElement>,
    maskMatRef: props.maskMatRef
  })

  // 색 적용
  const { applyHairColor } = useApplyHairColor({
    modelMat: props.modelMat,
    maskMatRef: props.maskMatRef
  })

  useEffect(() => {
    if (props.maskMatRef.current) {
      originalMaskMatRef.current = props.maskMatRef.current.clone()
    }
  }, [])

  useEffect(() => {
    if (props.maskMatRef.current && originalMaskMatRef.current) {
      props.maskMatRef.current = originalMaskMatRef.current.clone()
    }
  }, [resetStatus])

  // 캔버스의 내부 해상도를 컨테이너 크기에 맞게 설정 (좌표 계산 정확도 개선)
  useEffect(() => {
    const canvas = ref.current
    if (canvas) {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    setActiveTool(AI_TOOL.HAIR_COLOR)
  }, [])

  // 브러시 색상 변경 시 applyColor 호출
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }
    applyHairColor()
  }, [memoizedHairColor, memoizedHairColorOpacity, memoizedHairColorLevel])

  useEffect(() => {
    useGlobalHistoryStore
      .getState()
      .addEntry('hairColor', applyHairColor() ?? '', props.maskMatRef.current)
  }, [colorChangeStatus])

  // 브러시 선택 시 호버 표시
  useEffect(() => {
    if (isEditing) {
      drawHairHighlight({ showHighlight: true })
    }
    if (!isEditing) {
      drawHairHighlight({ showHighlight: false })
      applyHairColor()
    }
  }, [isEditing])

  const mapToolSizeToPx = (size: number) => {
    const MIN_PX = 16
    const MAX_PX = 120
    return MIN_PX + (size / 100) * (MAX_PX - MIN_PX)
  }

  const drawSegmentAt = (x: number, y: number) => {
    if (!props.maskMatRef.current) return
    const center = new cv.Point(x, y)
    const scalarValue =
      selectedToolId === TOOL_IDS.ADD_MASK
        ? new cv.Scalar(100)
        : new cv.Scalar(0)
    cv.circle(
      props.maskMatRef.current,
      center,
      mapToolSizeToPx(toolSize) / 2,
      scalarValue,
      -1
    )
  }

  // 마우스 좌표 계산 함수
  const getMousePosition = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = (ref as React.RefObject<HTMLCanvasElement>).current
    if (!canvas || !props.maskMatRef?.current) return null

    const rect = canvas.getBoundingClientRect()
    const displayX = e.clientX - rect.left
    const displayY = e.clientY - rect.top

    const scaleX = canvas.width / rect.width
    const scaleY = canvas.height / rect.height

    const realX = displayX * scaleX
    const realY = displayY * scaleY

    return {
      display: { x: displayX, y: displayY },
      real: { x: realX, y: realY },
      segment: props.maskMatRef?.current?.ucharAt(
        Math.floor(realY),
        Math.floor(realX)
      )
    }
  }

  // 마우스 다운 이벤트 수정
  const handleMouseDown = () => {
    setIsMouseDown(true)
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const mainCanvas = ref.current
    if (!mainCanvas || !props.maskMatRef?.current) return
    const pos = getMousePosition(e)
    if (!pos) return

    setMousePos(pos.display)

    if (isMouseDown && isEditing) {
      drawSegmentAt(pos.real.x, pos.real.y)
      drawHairHighlight({ showHighlight: true })
    }
  }

  // 마우스 업 이벤트 추가
  const handleMouseUp = () => {
    setIsMouseDown(false)
  }

  // 마우스 캔버스 벗어남 이벤트 수정
  const handleMouseLeave = () => {}

  return (
    <div
      className={cn('relative size-full', {
        'cursor-none': isEditing && selectedToolId
      })}
    >
      {/* 캔버스 레이어 */}
      <canvas
        ref={ref}
        className={cn('absolute left-0 top-0 z-50 size-full', {
          'cursor-none': isEditing && selectedToolId
        })}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        onMouseMove={handleMouseMove}
      />

      {isEditing && selectedToolId ? (
        <div
          style={{
            position: 'absolute',
            top: mousePos.y - mapToolSizeToPx(toolSize) / 2,
            left: mousePos.x - mapToolSizeToPx(toolSize) / 2,
            width: mapToolSizeToPx(toolSize),
            height: mapToolSizeToPx(toolSize),
            border: `1px solid ${selectedToolId === TOOL_IDS.ADD_MASK ? '#6effb6' : '#ffffff'}`,
            borderRadius: '50%',
            backgroundColor: 'rgba(0,0,0,0.05)',
            pointerEvents: 'none',
            zIndex: 20
          }}
        />
      ) : null}
    </div>
  )
}
