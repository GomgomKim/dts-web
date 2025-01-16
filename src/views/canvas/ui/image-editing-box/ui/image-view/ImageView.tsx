'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

import NextImage from 'next/image'

import { useEditorStore } from '@/views/_generate/model/useEditorHistoryStore'
import { applyMultiplyAndFeather } from '@/views/canvas/lib/editColorService'
import { getAssetUrl } from '@/views/canvas/lib/getAssetUrl'
import { lensPositions } from '@/views/canvas/model/LensDummyData'
import {
  useColorBrushStore,
  useEyeContactsStore
} from '@/views/canvas/model/useEditorPanelsStore'
import { useToolModeStore } from '@/views/canvas/model/useToolModeStore'

import { AI_TOOL, AiToolId } from '@/widgets/canvas-sidebar/model/types'

import { URL_VARIATION_IMAGE } from '@/entities/generate/constant'
import { DummyData } from '@/entities/recent-items/model/types'

import { Variation } from '@/shared/api/types'

import FaceParseImg from '/public/images/face_parse.png'

import { TOOL_IDS } from '../../../brush-erase-toggle/model'
import {
  CUSTOM_BRUSH_START,
  MAX_CUSTOM_BRUSHES,
  createCustomBrush
} from '../../../editor-panels/color-brush/model'

interface ImageViewProps {
  selectedVariation: Variation | null
  selectedAiTool?: AiToolId | null
}

export const ImageView = (props: ImageViewProps) => {
  const editedVariationList = useEditorStore((state) => state.items)
  const targetSize = 732

  const canvasRef = useRef<HTMLCanvasElement>(null)

  // 컬러 브러시 관련 (Zustand 등)
  const {
    customBrushes,
    selectedColorBrushItem,
    addCustomBrush,
    colorBrushColor,
    colorBrushOpacity,
    setSelectedColorBrushItem,
    colorBrushSmoothEdges
  } = useColorBrushStore()
  const [currentBrushSegment, setCurrentBrushSegment] = useState<number | null>(
    null
  )

  // 브러시 커서 사이즈 및 종류 (brush / erase)
  const { toolSize, selectedTool } = useToolModeStore()

  // 렌즈 관련
  const selectedEyeContactsItem = useEyeContactsStore(
    (state) => state.selectedItem
  )
  const eyeContactsTransparency = useEyeContactsStore(
    (state) => state.transparency
  )

  // OpenCV.js용 Mat
  const maskMatRef = useRef<cv.Mat | null>(null)
  // 원본 마스크 저장
  const originalMaskMatRef = useRef<cv.Mat | null>(null)
  // 브러시로 칠한 마스크 저장
  const [brushMaskMat, setBrushMaskMat] = useState<cv.Mat | null>(null)
  const [modelMat, setModelMat] = useState<cv.Mat | null>(null)

  const [isDrawing, setIsDrawing] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  // 호버 노출 여부
  const [showHighlight, setShowHighlight] = useState(false)
  const [prevPos, setPrevPos] = useState<{ x: number; y: number } | null>(null)
  // 브러시 마스킹 초기화
  useEffect(() => {
    if (maskMatRef.current && !brushMaskMat) {
      const brush = new cv.Mat(
        maskMatRef.current.rows,
        maskMatRef.current.cols,
        cv.CV_8UC1,
        new cv.Scalar(0)
      )
      setBrushMaskMat(brush)
    }
  }, [maskMatRef])

  useEffect(() => {
    applyColor()
  }, [colorBrushSmoothEdges])

  // 이미지 URL 생성 로직 (variationId, images 등)
  let imgUrl = ''
  if (props.selectedVariation) {
    const { variationId, images } = props.selectedVariation

    if (editedVariationList.has(variationId.toString())) {
      const present = editedVariationList.get(variationId.toString())?.present
      const presentAspectRatio = present?.ratio
      const presentVariation = images.find((item) => {
        return item.ratio === presentAspectRatio
      })
      if (presentVariation) {
        imgUrl =
          process.env.NEXT_PUBLIC_API_MOCKING === 'enabled'
            ? presentVariation.encryptedImageUrl
            : process.env.NEXT_PUBLIC_API_URL +
              URL_VARIATION_IMAGE +
              presentVariation.encryptedImageUrl
      }
    } else {
      // 기본 이미지
      if (images[0]) {
        imgUrl =
          process.env.NEXT_PUBLIC_API_MOCKING === 'enabled'
            ? images[0].encryptedImageUrl
            : process.env.NEXT_PUBLIC_API_URL +
              URL_VARIATION_IMAGE +
              images[0].encryptedImageUrl
      }
    }
  }

  // 이미지 로드 -> modelMat, maskMat 생성
  useEffect(() => {
    if (!cv || !imgUrl) {
      console.log('OpenCV not loaded or missing images.')
      return
    }

    // 원본 이미지 로드
    const originalImg = new Image()
    originalImg.crossOrigin = 'anonymous'
    originalImg.onload = () => {
      // 비율을 유지하면서 리사이징하기 위한 계산
      const scale = Math.min(
        targetSize / originalImg.width,
        targetSize / originalImg.height
      )
      const scaledWidth = Math.round(originalImg.width * scale)
      const scaledHeight = Math.round(originalImg.height * scale)

      // 중앙 정렬을 위한 오프셋 계산
      const offsetX = Math.round((targetSize - scaledWidth) / 2)
      const offsetY = Math.round((targetSize - scaledHeight) / 2)

      // 원본 이미지용 modelMat 생성
      const tempCanvas = document.createElement('canvas')
      tempCanvas.width = targetSize
      tempCanvas.height = targetSize
      const ctx = tempCanvas.getContext('2d')
      if (!ctx) return

      // 비율 유지하며 중앙에 그리기
      ctx.drawImage(originalImg, offsetX, offsetY, scaledWidth, scaledHeight)

      // 모델 mat 정보 저장
      const modelMat = cv.imread(tempCanvas)
      setModelMat(modelMat)

      // UI 캔버스에도 동일하게 적용
      const mainCanvas = canvasRef.current
      if (!mainCanvas) return
      mainCanvas.width = targetSize
      mainCanvas.height = targetSize
      const ctx2 = mainCanvas.getContext('2d')
      if (ctx2) {
        ctx2.fillStyle = '#FFFFFF'
        ctx2.fillRect(0, 0, targetSize, targetSize)
        ctx2.drawImage(originalImg, offsetX, offsetY, scaledWidth, scaledHeight)
      }

      // Parse 이미지도 동일한 비율로 리사이징
      const parseImg = new Image()
      parseImg.crossOrigin = 'anonymous'
      parseImg.onload = () => {
        const parseCanvas = document.createElement('canvas')
        parseCanvas.width = targetSize
        parseCanvas.height = targetSize
        const parseCtx = parseCanvas.getContext('2d')
        if (!parseCtx) return

        // parse 이미지도 동일한 비율과 위치로 그리기
        parseCtx.drawImage(
          parseImg,
          offsetX,
          offsetY,
          scaledWidth,
          scaledHeight
        )

        const parseData = parseCtx.getImageData(0, 0, targetSize, targetSize)
        const pixels = parseData.data

        // 초기 maskMat 생성 및 세그먼트 정보 저장
        const initMaskMat = new cv.Mat(targetSize, targetSize, cv.CV_8UC1)
        for (let i = 0; i < targetSize; i++) {
          for (let j = 0; j < targetSize; j++) {
            const idx = (i * targetSize + j) * 4
            initMaskMat.data[i * targetSize + j] = pixels[idx]
          }
        }
        originalMaskMatRef.current = initMaskMat.clone()
        maskMatRef.current = initMaskMat.clone()
      }
      parseImg.src = FaceParseImg.src
    }
    originalImg.src = imgUrl
  }, [imgUrl])

  // 브러시 색상 변경 시 applyColor 호출
  useEffect(() => {
    applyColor()
  }, [colorBrushColor, colorBrushOpacity])

  // 캔버스에 하이라이트 효과 그리기
  const drawHighlight = useCallback(() => {
    const mainCanvas = canvasRef.current
    if (!mainCanvas || !modelMat || !maskMatRef.current || !showHighlight)
      return

    const ctx = mainCanvas.getContext('2d')
    if (!ctx) return

    // 먼저 원본 이미지 다시 그리기
    cv.imshow(mainCanvas, modelMat)

    // 선택된 브러시의 세그먼트들만 하이라이트
    const segmentsToHighlight = selectedColorBrushItem?.segments ?? []

    if (segmentsToHighlight.length > 0) {
      for (let i = 0; i < maskMatRef.current.rows; i++) {
        for (let j = 0; j < maskMatRef.current.cols; j++) {
          const val = maskMatRef.current.ucharAt(i, j)
          if (segmentsToHighlight.includes(val)) {
            ctx.fillStyle = 'rgba(110, 255, 182, 0.3)'
            ctx.fillRect(j, i, 1, 1)
          }
        }
      }
    }
  }, [selectedColorBrushItem, modelMat, maskMatRef.current, showHighlight])

  // 브러시 선택 시 호버 표시
  useEffect(() => {
    console.log('hover : ', selectedColorBrushItem)
    console.log('hover : ', showHighlight)
    if (selectedColorBrushItem) {
      setShowHighlight(true)
    }
  }, [selectedColorBrushItem])

  useEffect(() => {
    drawHighlight()
  }, [drawHighlight])

  // 마우스 좌표 계산 함수
  const getMousePosition = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas || !maskMatRef.current) return null

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
      segment: maskMatRef.current.ucharAt(Math.floor(realY), Math.floor(realX))
    }
  }

  // 마우스 다운 이벤트 수정
  const handleMouseDown = () => {
    setIsDrawing(true)

    // 새로운 클릭 시 이전 위치 초기화 (선이 이어지지 않도록)
    setPrevPos(null)

    // 새 브러시 그리기 시작할 때 새로운 세그먼트 값 할당
    if (selectedTool === TOOL_IDS.BRUSH && !selectedColorBrushItem) {
      if (customBrushes.length < MAX_CUSTOM_BRUSHES) {
        const newSegment = CUSTOM_BRUSH_START - customBrushes.length
        setCurrentBrushSegment(newSegment)
      }
    }
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const mainCanvas = canvasRef.current
    if (!mainCanvas || !maskMatRef.current) return

    const pos = getMousePosition(e)
    if (!pos) return

    // 커서 위치용
    setMousePos(pos.display)

    // 브러시 기능
    if (isDrawing && selectedTool) {
      // 선택된 브러시가 있으면 해당 세그먼트들로, 없으면 새로운 세그먼트로 마스킹
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
                  cv.circle(
                    maskMatRef.current!,
                    new cv.Point(x, y),
                    mapToolSizeToPx(toolSize) / 2,
                    new cv.Scalar(segmentValue),
                    -1
                  )
                })
              }
              // 지우개 모드일 때는 단일 -1 값으로 마스킹
              if (selectedTool === TOOL_IDS.ERASE) {
                cv.circle(
                  maskMatRef.current!,
                  new cv.Point(x, y),
                  mapToolSizeToPx(toolSize) / 2,
                  new cv.Scalar(0),
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
    setIsDrawing(false)
    if (selectedTool === TOOL_IDS.ERASE) {
      applyColor()
    }
  }

  // 마우스 캔버스 벗어남 이벤트 수정
  const handleMouseLeave = () => {
    setIsDrawing(false)
  }

  // 색상 적용 함수 수정
  const applyColor = useCallback(() => {
    if (!modelMat || !maskMatRef.current) return

    // 선택된 브러시의 모든 세그먼트 또는 현재 그리고 있는 브러시의 세그먼트
    const segmentsToColor =
      selectedColorBrushItem?.segments ??
      (currentBrushSegment ? [currentBrushSegment] : null)

    if (!segmentsToColor) return

    console.log('segmentsToColor : ', segmentsToColor)

    // 새로 그린 브러시인 경우 (currentBrushSegment가 있고 아직 브러시로 등록되지 않은 경우)
    if (
      currentBrushSegment &&
      !selectedColorBrushItem &&
      customBrushes.length < MAX_CUSTOM_BRUSHES
    ) {
      const newBrush = createCustomBrush(customBrushes.length + 1)
      addCustomBrush(newBrush)
      setSelectedColorBrushItem(newBrush)
      setCurrentBrushSegment(null)
    }

    // 세그먼트별 feather 값을 저장하는 Map 생성
    const segmentFeatherMap = new Map<number, number>()
    segmentsToColor.forEach((segment) => {
      segmentFeatherMap.set(segment, (colorBrushSmoothEdges / 100) * 30)
    })

    const base64 = applyMultiplyAndFeather(
      modelMat,
      maskMatRef.current,
      colorBrushOpacity,
      colorBrushColor,
      1, // powerNorm 1 고정 (향후 AI팀 공지 후 수정)
      'type1',
      segmentsToColor,
      segmentFeatherMap
    )

    const mainCanvas = canvasRef.current
    if (!mainCanvas) return
    const ctx = mainCanvas.getContext('2d')
    if (!ctx) return

    const outImg = new Image()
    outImg.onload = () => {
      ctx.clearRect(0, 0, mainCanvas.width, mainCanvas.height)
      ctx.drawImage(outImg, 0, 0)

      // modelMat 업데이트
      setModelMat(cv.imread(mainCanvas))

      // 색상 적용 후 호버 숨기기
      setShowHighlight(false)
    }
    outImg.src = base64
  }, [colorBrushSmoothEdges, colorBrushColor, colorBrushOpacity])

  const mapToolSizeToPx = (size: number) => {
    const MIN_PX = 16
    const MAX_PX = 120
    return MIN_PX + (size / 100) * (MAX_PX - MIN_PX)
  }

  // 렌더
  // 컬러/헤어 컬러 탭 UI (Canvas + 브러시)
  const renderColorBrushUI = () => {
    return (
      <div className="relative">
        <canvas
          ref={canvasRef}
          className="h-auto w-full cursor-none"
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
  }

  // 렌즈 탭 UI (백-렌즈-포어 레이어)
  const renderLensUI = () => {
    if (!props.selectedVariation) return null
    const lensPosData = lensPositions(props.selectedVariation.images[0].ratio)
    const leftEyePos = lensPosData.left_eye
    const rightEyePos = lensPosData.right_eye
    const originalWidth = 1280
    const scale = 732 / originalWidth

    return (
      <div className="relative size-[45.75rem]">
        {/* 메인 모델 이미지 */}
        <NextImage src={imgUrl} alt="" fill style={{ objectFit: 'contain' }} />

        {/*  Back 레이어  */}
        <NextImage
          src={props.selectedVariation?.images[0].encryptedImageUrl}
          alt="back layer"
          fill
          style={{ objectFit: 'contain' }}
        />

        {/* 렌즈 레이어 */}
        {selectedEyeContactsItem && leftEyePos && (
          <div
            style={{
              position: 'absolute',
              left: leftEyePos.xmin * scale,
              top: leftEyePos.ymin * scale,
              width: (leftEyePos.xmax - leftEyePos.xmin) * scale,
              height: (leftEyePos.ymax - leftEyePos.ymin) * scale,
              opacity: eyeContactsTransparency / 100
            }}
          >
            <NextImage
              src={getAssetUrl(selectedEyeContactsItem)}
              alt={(selectedEyeContactsItem as DummyData).name || ''}
              fill
              style={{ objectFit: 'contain' }}
            />
          </div>
        )}

        {selectedEyeContactsItem && rightEyePos && (
          <div
            style={{
              position: 'absolute',
              left: rightEyePos.xmin * scale,
              top: rightEyePos.ymin * scale,
              width: (rightEyePos.xmax - rightEyePos.xmin) * scale,
              height: (rightEyePos.ymax - rightEyePos.ymin) * scale,
              opacity: eyeContactsTransparency / 100
            }}
          >
            <NextImage
              src={getAssetUrl(selectedEyeContactsItem)}
              alt={(selectedEyeContactsItem as DummyData).name || ''}
              fill
              style={{ objectFit: 'contain' }}
            />
          </div>
        )}

        {/* fore 레이어 */}
        <NextImage
          src={props.selectedVariation.images[0].lensFore}
          alt="fore layer"
          fill
          style={{ objectFit: 'contain' }}
        />
      </div>
    )
  }

  // 최종 렌더: 탭(selectedAiTool) 체크
  if (props.selectedAiTool === AI_TOOL.COLOR_BRUSH) {
    return renderColorBrushUI()
  } else if (props.selectedAiTool === AI_TOOL.EYE_CONTACTS) {
    return renderLensUI()
  }

  // 선택된 탭이 없거나 예외적이면, 임시로 null 처리
  return null
}
