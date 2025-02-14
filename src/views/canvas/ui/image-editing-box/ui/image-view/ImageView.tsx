'use client'

import { useEffect, useRef, useState } from 'react'

import { matToBase64 } from '@/views/canvas/lib/editColorService'
import { useEditorStore } from '@/views/canvas/model/useEditorHistoryStore'
import { useColorBrushStore } from '@/views/canvas/model/useEditorPanelsStore'

import { AI_TOOL, AiToolId } from '@/widgets/canvas-sidebar/model/types'

import { URL_VARIATION_IMAGE } from '@/entities/generate/constant'

import { Variation } from '@/shared/api/types'

import FaceParseImg from '/public/images/face_parse.png'
import HairMaskImg from '/public/images/hair_mask.png'
import NormalMapImg from '/public/images/normal.png'

import { useLayersStore } from './lib/useLayersStore'
import { useOnClickOutside } from './lib/useOnClickOutside'
import { ColorBrushView } from './ui/ColorBrushView'
import { LayeredImageView } from './ui/LayeredImageView'

interface ImageViewProps {
  selectedVariation: Variation | null
  selectedAiTool?: AiToolId | null
}

export const ImageView = (props: ImageViewProps) => {
  const editedVariationList = useEditorStore((state) => state.items)
  const targetSize = 732

  const [canvasElement, setCanvasElement] = useState<HTMLCanvasElement | null>(
    null
  )
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const isColorBrush = props.selectedAiTool === AI_TOOL.COLOR_BRUSH
  const isHairColor = props.selectedAiTool === AI_TOOL.HAIR_COLOR
  const isEyeContacts = props.selectedAiTool === AI_TOOL.EYE_CONTACTS
  const isSkinGlow = props.selectedAiTool === AI_TOOL.SKIN_GLOW

  // OpenCV.js용 Mat
  const maskMatRef = useRef<cv.Mat | null>(null)
  const hairMaskMatRef = useRef<cv.Mat | null>(null)
  // 원본 마스크 저장
  const originalMaskMatRef = useRef<cv.Mat | null>(null)
  // 브러시로 칠한 마스크 저장
  const [brushMaskMat, setBrushMaskMat] = useState<cv.Mat | null>(null)
  const [modelMat, setModelMat] = useState<cv.Mat | null>(null)

  const setBaseLayer = useLayersStore((state) => state.setBaseLayer)

  const backgroundRef = useRef<HTMLDivElement>(null)
  const setSelectedColorBrushItem = useColorBrushStore(
    (state) => state.setSelectedColorBrushItem
  )

  // 외부(배경) 클릭 시 도구 선택 해제
  useOnClickOutside(backgroundRef, () => {
    setSelectedColorBrushItem(null)
  })

  // 브러시 마스킹 초기화
  useEffect(() => {
    if (maskMatRef.current && !brushMaskMat) {
      const brush = new window.cv.Mat(
        maskMatRef.current.rows,
        maskMatRef.current.cols,
        window.cv.CV_8UC1,
        new window.cv.Scalar(0)
      )
      setBrushMaskMat(brush)
    }
  }, [maskMatRef])

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

  // ref 변화 감지, 매 랜더링마다 실행 (실시간 필요)
  useEffect(() => {
    if (canvasRef.current !== canvasElement) {
      setCanvasElement(canvasRef.current)
    }
  })

  // 이미지 로드 -> modelMat, maskMat 생성
  useEffect(() => {
    if (!window.cv || !imgUrl || !canvasRef.current) {
      return
    }

    // 원본 이미지 로드
    const originalImg = new Image()
    originalImg.crossOrigin = 'anonymous'
    originalImg.onload = () => {
      console.log('originalImg:', originalImg)
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
      const modelMat = window.cv.imread(tempCanvas)
      setModelMat(modelMat)
      const base64 = matToBase64(modelMat)
      setBaseLayer(base64)

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
        const initMaskMat = new window.cv.Mat(
          targetSize,
          targetSize,
          window.cv.CV_8UC1
        )
        for (let i = 0; i < targetSize; i++) {
          for (let j = 0; j < targetSize; j++) {
            const idx = (i * targetSize + j) * 4
            initMaskMat.data[i * targetSize + j] = pixels[idx]
          }
        }
        originalMaskMatRef.current = initMaskMat.clone()
        maskMatRef.current = initMaskMat.clone()
        console.log('initMaskMat:', initMaskMat)
      }
      parseImg.src = FaceParseImg.src
    }

    // Hair 마스크 이미지 로드
    const hairMaskImg = new Image()
    hairMaskImg.crossOrigin = 'anonymous'
    hairMaskImg.onload = () => {
      // 비율을 유지하면서 리사이징하기 위한 계산
      const scale = Math.min(
        targetSize / hairMaskImg.width,
        targetSize / hairMaskImg.height
      )
      const scaledWidth = Math.round(hairMaskImg.width * scale)
      const scaledHeight = Math.round(hairMaskImg.height * scale)

      // 중앙 정렬을 위한 오프셋 계산
      const offsetX = Math.round((targetSize - scaledWidth) / 2)
      const offsetY = Math.round((targetSize - scaledHeight) / 2)
      const hairMaskCanvas = document.createElement('canvas')
      hairMaskCanvas.width = targetSize
      hairMaskCanvas.height = targetSize
      const hairMaskCtx = hairMaskCanvas.getContext('2d')
      if (!hairMaskCtx) return

      // hair 마스크 이미지도 동일한 비율과 위치로 그리기
      hairMaskCtx.drawImage(
        hairMaskImg,
        offsetX,
        offsetY,
        scaledWidth,
        scaledHeight
      )

      const hairMaskData = hairMaskCtx.getImageData(
        0,
        0,
        targetSize,
        targetSize
      )
      const hairPixels = hairMaskData.data

      // 초기 hairMaskMat 생성
      const initHairMaskMat = new window.cv.Mat(
        targetSize,
        targetSize,
        window.cv.CV_8UC1
      )
      for (let i = 0; i < targetSize; i++) {
        for (let j = 0; j < targetSize; j++) {
          const idx = (i * targetSize + j) * 4
          initHairMaskMat.data[i * targetSize + j] = hairPixels[idx]
        }
      }
      hairMaskMatRef.current = initHairMaskMat.clone()
    }
    hairMaskImg.src = HairMaskImg.src
    originalImg.src = imgUrl

    // Normal Map 이미지 로드
    const normalMapImg = new Image()
    normalMapImg.crossOrigin = 'anonymous'
    normalMapImg.onload = () => {
      // 비율을 유지하면서 리사이징하기 위한 계산
      const scale = Math.min(
        targetSize / normalMapImg.width,
        targetSize / normalMapImg.height
      )
      const scaledWidth = Math.round(normalMapImg.width * scale)
      const scaledHeight = Math.round(normalMapImg.height * scale)

      // 중앙 정렬을 위한 오프셋 계산
      const offsetX = Math.round((targetSize - scaledWidth) / 2)
      const offsetY = Math.round((targetSize - scaledHeight) / 2)

      const normalMapCanvas = document.createElement('canvas')
      normalMapCanvas.width = targetSize
      normalMapCanvas.height = targetSize
      const normalMapCtx = normalMapCanvas.getContext('2d')
      if (!normalMapCtx) return

      // normal map 이미지도 동일한 비율과 위치로 그리기
      normalMapCtx.drawImage(
        normalMapImg,
        offsetX,
        offsetY,
        scaledWidth,
        scaledHeight
      )
    }
    normalMapImg.src = NormalMapImg.src
  }, [imgUrl, canvasElement])

  // 렌더
  return (
    <div
      ref={backgroundRef}
      style={{ position: 'relative', width: '100%', height: '100%' }}
    >
      {/* 최종 합성 캔버스 */}
      <LayeredImageView />

      {/* 브러시 */}
      {isColorBrush ? (
        <ColorBrushView modelMat={modelMat} maskMatRef={maskMatRef} />
      ) : null}

      {/* 헤어 컬러 */}
      {isHairColor ? <></> : null}

      {/* 스킨 글로우 */}
      {isSkinGlow ? <></> : null}

      {/* 렌즈 효과  */}
      {isEyeContacts ? <></> : null}

      {/* Mat 제작용 캔버스 (UI에 보여주지 않음) */}
      <canvas
        ref={canvasRef}
        style={{ position: 'absolute', left: '-9999px', top: '0' }}
      />
    </div>
  )
}
