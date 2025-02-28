import { useEffect, useMemo, useRef, useState } from 'react'

import {
  useColorBrushStore,
  useColorChangeStore
} from '@/views/canvas/model/useEditorPanelsStore'
import { useGlobalHistoryStore } from '@/views/canvas/model/useGlobalHistoryStore'
import { useLayerVisibilityStore } from '@/views/canvas/model/useLayerVisibilityStore'
import { useToolModeStore } from '@/views/canvas/model/useToolModeStore'
import { TOOL_IDS } from '@/views/canvas/ui/brush-erase-toggle/model'
import {
  CUSTOM_BRUSH_START,
  MAX_CUSTOM_BRUSHES
} from '@/views/canvas/ui/editor-panels/color-brush/model'

import { AI_TOOL } from '@/widgets/canvas-sidebar/model/types'

import { cn } from '@/shared/lib/utils'

import { useApplyColor } from '../lib/useApplyColor'
import { useCanvasHighlight } from '../lib/useCanvasHighlight'
import { useLayersStore } from '../lib/useLayersStore'

type ColorBrushViewProps = {
  modelMat: cv.Mat | null
  maskMatRef: React.RefObject<cv.Mat>
  brushMaskMatRefs: {
    [key: string]: React.MutableRefObject<cv.Mat | null>
  }
  setBrushMaskMatRefs: (refs: {
    [key: string]: React.MutableRefObject<cv.Mat | null>
  }) => void
}

export const ColorBrushView = (props: ColorBrushViewProps) => {
  // 컬러 브러시 관련 (Zustand 등)
  const customBrushes = useColorBrushStore((state) => state.customBrushes)
  const colorBrushSmoothEdges = useColorBrushStore(
    (state) => state.colorBrushSmoothEdges
  )
  const memoizedColorBrushSmoothEdges = useMemo(
    () => colorBrushSmoothEdges,
    [JSON.stringify(colorBrushSmoothEdges)]
  )
  const selectedColorBrushItem = useColorBrushStore(
    (state) => state.selectedColorBrushItem
  )
  const colorBrushColor = useColorBrushStore((state) => state.colorBrushColor)
  const memoizedColorBrushColor = useMemo(
    () => colorBrushColor,
    [JSON.stringify(colorBrushColor)]
  )
  const colorBrushOpacity = useColorBrushStore(
    (state) => state.colorBrushOpacity
  )
  const memoizedColorBrushOpacity = useMemo(
    () => colorBrushOpacity,
    [JSON.stringify(colorBrushOpacity)]
  )

  const activeToolVisibility = useLayerVisibilityStore(
    (state) => state.activeToolVisibility
  )
  const globalVisibility = useLayerVisibilityStore(
    (state) => state.globalVisibility
  )
  const disableBrush = !activeToolVisibility || !globalVisibility

  const [currentBrushSegment, setCurrentBrushSegment] = useState<number | null>(
    null
  )
  const setActiveTool = useLayerVisibilityStore((state) => state.setActiveTool)
  const ref = useRef<HTMLCanvasElement>(null)
  // 마우스 위치 상태
  const [isDrawing, setIsDrawing] = useState<boolean>(false)
  const [mousePos, setMousePos] = useState<{
    x: number | null
    y: number | null
  }>({ x: null, y: null })
  const [prevPos, setPrevPos] = useState<{
    x: number | null
    y: number | null
  }>({ x: null, y: null })

  // 브러시 커서 사이즈 및 종류 (brush / erase)
  const toolSize = useToolModeStore((state) => state.toolSize)
  const selectedTool = useToolModeStore((state) => state.selectedTool)

  const prevSelectedBrushRef = useRef<typeof selectedColorBrushItem>(null)

  const isFirstRender = useRef<boolean>(true)

  const resetStatus = useLayersStore((state) => state.resetStatus)

  const history = useGlobalHistoryStore((state) => state.globalHistory)
  const currentIndex = useGlobalHistoryStore((state) => state.currentIndex)
  const currentEntry = history[currentIndex]

  const colorChangeStatus = useColorChangeStore(
    (state) => state.colorChangeStatus
  )

  useEffect(() => {
    if (currentEntry && currentEntry.mat && currentEntry.layer) {
      const layerName = currentEntry.layer

      const brushLayers = [
        'lips',
        'eyebrows',
        'brush_1',
        'brush_2',
        'brush_3',
        'brush_4',
        'brush_5',
        'brush_6'
      ]

      if (brushLayers.includes(layerName)) {
        if (props.brushMaskMatRefs[layerName]) {
          props.brushMaskMatRefs[layerName].current = currentEntry.mat.clone()
        }
      }
    }
  }, [currentEntry])

  useEffect(() => {
    if (props.maskMatRef.current) {
      props.setBrushMaskMatRefs({
        lips: { current: props.maskMatRef.current.clone() },
        eyebrows: { current: props.maskMatRef.current.clone() },
        brush_1: { current: props.maskMatRef.current.clone() },
        brush_2: { current: props.maskMatRef.current.clone() },
        brush_3: { current: props.maskMatRef.current.clone() },
        brush_4: { current: props.maskMatRef.current.clone() },
        brush_5: { current: props.maskMatRef.current.clone() },
        brush_6: { current: props.maskMatRef.current.clone() }
      })
    }
  }, [props.maskMatRef.current, resetStatus])

  // 현재 선택된 브러시 아이디에 따라 활성화된 mask ref를 결정합니다.
  const getActiveMaskRef = () => {
    if (
      selectedColorBrushItem &&
      props.brushMaskMatRefs[selectedColorBrushItem.id]
    ) {
      return props.brushMaskMatRefs[selectedColorBrushItem.id]
    }
    return props.maskMatRef
  }

  // 얼굴 부위별 호버
  const { drawHighlight } = useCanvasHighlight({
    canvasRef: ref as React.RefObject<HTMLCanvasElement>,
    maskMatRef: getActiveMaskRef()
  })

  // 색 적용
  const { applyColor } = useApplyColor({
    modelMat: props.modelMat,
    maskMatRef: getActiveMaskRef()
  })

  // 캔버스의 내부 해상도를 컨테이너 크기에 맞게 설정 (좌표 계산 정확도 개선)
  useEffect(() => {
    const canvas = ref.current
    if (canvas) {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    setActiveTool(AI_TOOL.COLOR_BRUSH)
  }, [])

  // 브러시 색상 변경 시 applyColor 호출
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }
    applyColor()

    if (prevSelectedBrushRef.current && selectedColorBrushItem) {
      // 기존 브러시와 동일하다면 하이라이트 숨김 (같은 브러시 내 색상 변경 등)
      if (prevSelectedBrushRef.current.id === selectedColorBrushItem.id) {
        drawHighlight({ showHighlight: false })
      }
    }
    prevSelectedBrushRef.current = selectedColorBrushItem
  }, [
    memoizedColorBrushColor,
    memoizedColorBrushOpacity,
    memoizedColorBrushSmoothEdges
  ])

  useEffect(() => {
    useGlobalHistoryStore
      .getState()
      .addEntry(
        selectedColorBrushItem?.id ?? '',
        applyColor() ?? '',
        getActiveMaskRef().current
      )
  }, [colorChangeStatus])

  // 선택된 브러시가 변경되었는지 이전 값과 비교하여 하이라이트 제어
  useEffect(() => {
    if (selectedColorBrushItem) {
      drawHighlight({ showHighlight: true })
    }
    if (!selectedColorBrushItem) {
      drawHighlight({ showHighlight: false })
    }
  }, [selectedColorBrushItem])

  // 마우스 좌표 계산 함수
  const getMousePosition = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = (ref as React.RefObject<HTMLCanvasElement>).current
    if (!canvas || !getActiveMaskRef()?.current) return null

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
      segment: getActiveMaskRef()?.current?.ucharAt(
        Math.floor(realY),
        Math.floor(realX)
      )
    }
  }

  // 마우스 다운 이벤트 수정
  const handleMouseDown = () => {
    setIsDrawing(true)

    // 새로운 클릭 시 이전 위치 초기화 (선이 이어지지 않도록)
    setPrevPos({ x: null, y: null })

    drawHighlight({ showHighlight: false })

    // 새 브러시 그리기 시작할 때 새로운 세그먼트 값 할당
    if (!selectedColorBrushItem) {
      if (customBrushes.length < MAX_CUSTOM_BRUSHES) {
        const newSegment = CUSTOM_BRUSH_START - customBrushes.length
        setCurrentBrushSegment(newSegment)
      }
    }
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const mainCanvas = ref.current
    const activeMaskRef = getActiveMaskRef()
    if (!mainCanvas || !activeMaskRef?.current) return
    const pos = getMousePosition(e)
    if (!pos) return

    setMousePos(pos.display)

    if (isDrawing && selectedTool) {
      const segments =
        selectedColorBrushItem?.segments ??
        (currentBrushSegment ? [currentBrushSegment] : [])

      if (segments.length > 0) {
        const ctx = mainCanvas.getContext('2d')
        if (ctx) {
          ctx.fillStyle =
            selectedTool === TOOL_IDS.ERASE
              ? 'rgba(0, 0, 0, 0)'
              : 'rgba(0, 0, 0, 0)'

          if (prevPos.x && prevPos.y) {
            ctx.beginPath()
            ctx.moveTo(prevPos.x, prevPos.y)
            ctx.lineTo(pos.real.x, pos.real.y)
            ctx.lineWidth = (mapToolSizeToPx(toolSize) / 2) * 2
            ctx.strokeStyle = ctx.fillStyle
            ctx.lineCap = 'round'
            ctx.lineJoin = 'round'
            ctx.stroke()

            const dx = pos.real.x - prevPos.x
            const dy = pos.real.y - prevPos.y
            const distance = Math.sqrt(dx * dx + dy * dy)
            const steps = Math.max(Math.floor(distance), 1)

            for (let i = 0; i <= steps; i++) {
              const t = i / steps
              const x = prevPos.x + dx * t
              const y = prevPos.y + dy * t

              if (selectedTool === TOOL_IDS.BRUSH) {
                segments.forEach((segmentValue) => {
                  window.cv.circle(
                    activeMaskRef.current!,
                    new window.cv.Point(x, y),
                    mapToolSizeToPx(toolSize) / 2,
                    new window.cv.Scalar(segmentValue),
                    -1
                  )
                })
              }
              if (selectedTool === TOOL_IDS.ERASE) {
                window.cv.circle(
                  activeMaskRef.current!,
                  new window.cv.Point(x, y),
                  mapToolSizeToPx(toolSize) / 2,
                  new window.cv.Scalar(0),
                  -1
                )
              }
            }
          } else {
            ctx.beginPath()
            ctx.arc(
              pos.real.x,
              pos.real.y,
              mapToolSizeToPx(toolSize) / 2,
              0,
              2 * Math.PI
            )
            ctx.fill()
          }
        }
      }

      setPrevPos({ x: pos.real.x, y: pos.real.y })
      if (!disableBrush) {
        applyColor()
      }
    }
  }

  // 마우스 업 이벤트 추가
  const handleMouseUp = () => {
    setIsDrawing(false)
    useGlobalHistoryStore
      .getState()
      .addEntry(
        selectedColorBrushItem?.id ?? '',
        applyColor() ?? '',
        getActiveMaskRef().current
      )
  }

  // 마우스 캔버스 벗어남 이벤트 수정
  const handleMouseLeave = () => {
    setIsDrawing(false)
  }

  const mapToolSizeToPx = (size: number) => {
    const MIN_PX = 16
    const MAX_PX = 120
    return MIN_PX + (size / 100) * (MAX_PX - MIN_PX)
  }

  return (
    <div className="relative size-full">
      {/* 캔버스 레이어 */}
      <canvas
        ref={ref}
        className={cn(
          'absolute left-0 top-0 z-40 size-full',
          disableBrush ? 'cursor-auto' : 'cursor-none'
        )}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        onMouseMove={handleMouseMove}
      />

      {/* 브러시 커서 */}
      {disableBrush ? null : (
        <div
          style={{
            position: 'absolute',
            top: mousePos?.y ? mousePos.y - mapToolSizeToPx(toolSize) / 2 : 0,
            left: mousePos?.x ? mousePos.x - mapToolSizeToPx(toolSize) / 2 : 0,
            width: mapToolSizeToPx(toolSize),
            height: mapToolSizeToPx(toolSize),
            border: `1px solid ${selectedTool === TOOL_IDS.BRUSH ? '#6effb6' : '#ffffff'}`,
            borderRadius: '50%',
            backgroundColor: 'rgba(0,0,0,0.05)',
            pointerEvents: 'none',
            zIndex: 100
          }}
        />
      )}
    </div>
  )
}
