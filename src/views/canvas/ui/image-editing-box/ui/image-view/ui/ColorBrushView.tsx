import { forwardRef, useEffect, useState } from 'react'

import Image from 'next/image'

import { compositeHairAndBrush } from '@/views/canvas/lib/editColorService'
import {
  useColorBrushStore,
  useHairColorStore
} from '@/views/canvas/model/useEditorPanelsStore'
import { useToolModeStore } from '@/views/canvas/model/useToolModeStore'
import { TOOL_IDS } from '@/views/canvas/ui/brush-erase-toggle/model'
import { MAX_CUSTOM_BRUSHES } from '@/views/canvas/ui/editor-panels/color-brush/model'
import { CUSTOM_BRUSH_START } from '@/views/canvas/ui/editor-panels/color-brush/model'

import { useCanvasApplyColor } from '../lib/useCanvasApplyColor'
import { useCanvasHighlight } from '../lib/useCanvasHighlight'

type ColorBrushViewProps = {
  imgUrl: string
  modelMat: cv.Mat | null
  setModelMat: (val: cv.Mat) => void
  maskMatRef: React.RefObject<cv.Mat>
  hairMaskMatRef: React.RefObject<cv.Mat>
  setColorBrushMats: (val: cv.Mat[]) => void
  setHairColorMat: (val: cv.Mat) => void
}

export const ColorBrushView = forwardRef<
  HTMLCanvasElement,
  ColorBrushViewProps
>((props, ref) => {
  // 컬러 브러시 관련 (Zustand 등)
  const {
    customBrushes,
    selectedColorBrushItem,
    colorBrushColor,
    colorBrushOpacity
  } = useColorBrushStore()
  const { hairColor, hairColorOpacity, hairColorLevel } = useHairColorStore()

  const [currentBrushSegment, setCurrentBrushSegment] = useState<number | null>(
    null
  )
  // 마우스 위치 상태
  const [isDrawing, setIsDrawing] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [prevPos, setPrevPos] = useState<{ x: number; y: number } | null>(null)
  const [isHairColorChange, setIsHairColorChange] = useState(false)

  // 브러시 커서 사이즈 및 종류 (brush / erase)
  const { toolSize, selectedTool } = useToolModeStore()

  // 호버 노출 여부
  const [showHighlight, setShowHighlight] = useState(false)

  // 얼굴 부위별 호버
  const { drawHighlight } = useCanvasHighlight({
    canvasRef: ref as React.RefObject<HTMLCanvasElement>,
    modelMat: props.modelMat,
    maskMatRef: props.maskMatRef,
    showHighlight
  })

  // 색 적용
  const { applyColor, applyHairColor } = useCanvasApplyColor({
    canvasRef: ref as React.RefObject<HTMLCanvasElement>,
    modelMat: props.modelMat,
    maskMatRef: props.maskMatRef,
    hairMaskMatRef: props.hairMaskMatRef,
    setModelMat: props.setModelMat,
    setShowHighlight,
    currentBrushSegment,
    setCurrentBrushSegment
  })

  // 머리 색상 변경 시 applyHairColor 호출
  useEffect(() => {
    // 브러시 마스크 먼저 저장
    const brushMat = applyColor()

    // 헤어 색상 적용
    const hairMat = applyHairColor()

    if (props.hairMaskMatRef.current) {
      const compositeMat = compositeHairAndBrush(
        hairMat,
        brushMat,
        props.hairMaskMatRef.current,
        hairColor || [0, 0, 0]
      )

      // 합성 결과를 modelMat으로 설정
      if (compositeMat) {
        const finalMat = compositeMat.clone()
        props.setModelMat(finalMat)
        compositeMat.delete()
        setIsHairColorChange(true)
      }
    }

    // 메모리 해제
    brushMat?.delete()
  }, [hairColor, hairColorOpacity, hairColorLevel])

  // 레이어 업데이트
  useEffect(() => {
    // 동기화 위한 타임아웃
    if (isHairColorChange) {
      setTimeout(() => {
        applyColor()
        setIsHairColorChange(false)
      }, 10)
    }
  }, [isHairColorChange])

  // 브러시 색상 변경 시 applyColor 호출
  useEffect(() => {
    const brushMat = applyColor()

    // brushMat의 복제본을 생성해 modelMat 업데이트
    if (brushMat) {
      props.setModelMat(brushMat.clone())
      brushMat.delete()
    }
  }, [colorBrushColor, colorBrushOpacity])

  // 브러시 선택 시 호버 표시
  useEffect(() => {
    if (selectedColorBrushItem) {
      setShowHighlight(true)
    }
  }, [selectedColorBrushItem])

  useEffect(() => {
    drawHighlight()
  }, [drawHighlight])

  // 마우스 좌표 계산 함수
  const getMousePosition = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = (ref as React.RefObject<HTMLCanvasElement>).current
    if (!canvas || !props.maskMatRef.current) return null

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
      segment: props.maskMatRef.current.ucharAt(
        Math.floor(realY),
        Math.floor(realX)
      )
    }
  }

  // 마우스 다운 이벤트 수정
  const handleMouseDown = () => {
    setIsDrawing(true)

    // 새로운 클릭 시 이전 위치 초기화 (선이 이어지지 않도록)
    setPrevPos(null)

    // 새 브러시 그리기 시작할 때 새로운 세그먼트 값 할당
    if (!selectedColorBrushItem) {
      if (customBrushes.length < MAX_CUSTOM_BRUSHES) {
        const newSegment = CUSTOM_BRUSH_START - customBrushes.length
        setCurrentBrushSegment(newSegment)
      }
    }
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const mainCanvas = (ref as React.RefObject<HTMLCanvasElement>).current
    if (!mainCanvas || !props.maskMatRef.current) return
    const pos = getMousePosition(e)
    if (!pos) return

    // 커서 위치용
    setMousePos(pos.display)

    // 브러시 기능
    if (isDrawing && selectedTool) {
      const segments =
        selectedColorBrushItem?.segments ??
        (currentBrushSegment ? [currentBrushSegment] : [])

      if (segments.length > 0) {
        // 캔버스에 브러시 표시
        const ctx = mainCanvas.getContext('2d')
        if (ctx) {
          ctx.fillStyle =
            selectedTool === TOOL_IDS.ERASE
              ? 'rgba(255, 0, 0, 0.1)'
              : 'rgba(110, 255, 182, 0.1)'

          if (prevPos) {
            // 부드러운 선 그리기
            ctx.beginPath()
            ctx.moveTo(prevPos.x, prevPos.y)
            ctx.lineTo(pos.real.x, pos.real.y)
            ctx.lineWidth = (mapToolSizeToPx(toolSize) / 2) * 2
            ctx.strokeStyle = ctx.fillStyle
            ctx.lineCap = 'round'
            ctx.lineJoin = 'round'
            ctx.stroke()

            // 마스킹도 선형으로 처리
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
                    props.maskMatRef.current!,
                    new window.cv.Point(x, y),
                    mapToolSizeToPx(toolSize) / 2,
                    new window.cv.Scalar(segmentValue),
                    -1
                  )
                })
              }
              // 지우개 모드일 때는 단일 -1 값으로 마스킹
              if (selectedTool === TOOL_IDS.ERASE) {
                window.cv.circle(
                  props.maskMatRef.current!,
                  new window.cv.Point(x, y),
                  mapToolSizeToPx(toolSize) / 2,
                  new window.cv.Scalar(0),
                  -1
                )
              }
            }
          } else {
            // 첫 점은 원으로 그리기
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
    }
  }

  // 마우스 업 이벤트 추가
  const handleMouseUp = () => {
    const brushMat = applyColor()

    // brushMat의 복제본을 생성해 modelMat 업데이트
    if (brushMat) {
      const updatedModelMat = brushMat.clone()
      props.setModelMat(updatedModelMat)
      brushMat.delete()
    }
    setIsDrawing(false)
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
      {/* 배경 이미지 */}
      <div className="relative size-full">
        <Image
          src={props.imgUrl}
          alt=""
          fill
          style={{ objectFit: 'contain' }}
          priority
        />
      </div>

      {/* 캔버스 레이어 */}
      <canvas
        ref={ref}
        className="absolute left-0 top-0 size-full cursor-none"
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        onMouseMove={handleMouseMove}
      />

      {/* 브러시 커서 */}
      <div
        style={{
          position: 'absolute',
          top: mousePos.y - mapToolSizeToPx(toolSize) / 2,
          left: mousePos.x - mapToolSizeToPx(toolSize) / 2,
          width: mapToolSizeToPx(toolSize),
          height: mapToolSizeToPx(toolSize),
          border: `1px solid ${selectedTool === TOOL_IDS.BRUSH ? '#6effb6' : '#ffffff'}`,
          borderRadius: '50%',
          backgroundColor: 'rgba(0,0,0,0.05)',
          pointerEvents: 'none'
        }}
      />
    </div>
  )
})

ColorBrushView.displayName = 'ColorBrushView'
