'use client'

import { useEffect, useRef, useState } from 'react'

import { matToBase64 } from '@/views/canvas/lib/editColorService'
import { useEditorStore } from '@/views/canvas/model/useEditorHistoryStore'
import { useColorBrushStore } from '@/views/canvas/model/useEditorPanelsStore'
import { useLayerVisibilityStore } from '@/views/canvas/model/useLayerVisibilityStore'

import { AI_TOOL, AiToolId } from '@/widgets/canvas-sidebar/model/types'

// import { URL_VARIATION_IMAGE } from '@/entities/generate/constant'
import { Variation } from '@/shared/api/types'

import FaceParseImg from '/public/images/face_parse.png'
import HairMaskImg from '/public/images/hair_mask.png'
import NormalMapImg from '/public/images/normal.png'

import { useEyeContactsLayer } from './lib/useEyeContactsLayer'
import { useLayersStore } from './lib/useLayersStore'
import { useOnClickOutside } from './lib/useOnClickOutside'
import { ColorBrushView } from './ui/ColorBrushView'
import { HairColorView } from './ui/HairColorView'
import { LayeredImageView } from './ui/LayeredImageView'
import { SkinGlowView } from './ui/SkinGlowView'

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
  const isSkinGlow = props.selectedAiTool === AI_TOOL.SKIN_GLOW
  const isEyeContacts = props.selectedAiTool === AI_TOOL.EYE_CONTACTS

  // OpenCV.js용 Mat
  const maskMatRef = useRef<cv.Mat | null>(null)
  const hairMaskMatRef = useRef<cv.Mat | null>(null)
  // 원본 마스크 저장
  const originalMaskMatRef = useRef<cv.Mat | null>(null)
  // 브러시로 칠한 마스크 저장
  const [brushMaskMat, setBrushMaskMat] = useState<cv.Mat | null>(null)
  const [modelMat, setModelMat] = useState<cv.Mat | null>(null)

  const setBaseLayer = useLayersStore((state) => state.setBaseLayer)
  const setActiveTool = useLayerVisibilityStore((state) => state.setActiveTool)

  const backgroundRef = useRef<HTMLDivElement>(null)
  const setSelectedColorBrushItem = useColorBrushStore(
    (state) => state.setSelectedColorBrushItem
  )

  const [brushMaskMatRefs, setBrushMaskMatRefs] = useState<{
    [key: string]: React.MutableRefObject<cv.Mat | null>
  }>({})

  // 노멀 맵
  const [normalMat, setNormalMat] = useState<cv.Mat | null>(null)

  // 외부(배경) 클릭 시 도구 선택 해제
  useOnClickOutside(backgroundRef, () => {
    setSelectedColorBrushItem(null)
  })

  useEffect(() => {
    if (isEyeContacts) {
      setActiveTool(AI_TOOL.EYE_CONTACTS)
    }
  }, [isEyeContacts])

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
        // imgUrl =
        //   process.env.NEXT_PUBLIC_API_MOCKING === 'enabled'
        //     ? presentVariation.encryptedImageUrl
        //     : process.env.NEXT_PUBLIC_API_URL +
        //       URL_VARIATION_IMAGE +
        //       presentVariation.encryptedImageUrl
        imgUrl = presentVariation.encryptedImageUrl
      }
    } else {
      // 기본 이미지
      if (images[0]) {
        // imgUrl =
        //   process.env.NEXT_PUBLIC_API_MOCKING === 'enabled'
        //     ? images[0].encryptedImageUrl
        //     : process.env.NEXT_PUBLIC_API_URL +
        //       URL_VARIATION_IMAGE +
        //       images[0].encryptedImageUrl
        imgUrl = images[0].encryptedImageUrl
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

    const normalMapImg = new Image()
    normalMapImg.crossOrigin = 'anonymous'
    normalMapImg.onload = () => {
      // 원본 노멀맵 이미지의 크기에 따라 스케일 계산 (비율 유지)
      const scale = Math.min(
        targetSize / normalMapImg.width,
        targetSize / normalMapImg.height
      )
      const scaledWidth = Math.round(normalMapImg.width * scale)
      const scaledHeight = Math.round(normalMapImg.height * scale)
      // 중앙 정렬을 위한 오프셋 계산
      const offsetX = Math.round((targetSize - scaledWidth) / 2)
      const offsetY = Math.round((targetSize - scaledHeight) / 2)
      const canvasForNormal = document.createElement('canvas')
      canvasForNormal.width = targetSize
      canvasForNormal.height = targetSize
      canvasForNormal.style.position = 'absolute'
      canvasForNormal.style.left = '-9999px'
      document.body.appendChild(canvasForNormal)

      const ctx = canvasForNormal.getContext('2d')
      if (ctx) {
        // 캔버스 전체를 흰색으로 채우거나, 필요에 따라 배경색 설정
        ctx.fillStyle = '#FFFFFF'
        ctx.fillRect(0, 0, targetSize, targetSize)
        // 이미지 그리기 (중앙 정렬)
        ctx.drawImage(normalMapImg, offsetX, offsetY, scaledWidth, scaledHeight)

        // OpenCV.js의 cv.imread()를 통해 캔버스의 내용을 cv.Mat으로 읽어들임
        const normalMat = window.cv.imread(canvasForNormal)
        setNormalMat(normalMat)
      }

      // OffscreenCanvas가 아니라면 DOM에서 제거
      if (!(canvasForNormal instanceof OffscreenCanvas)) {
        ;(canvasForNormal as HTMLCanvasElement).remove()
      }
    }
    normalMapImg.onerror = (err) => {
      console.error('노멀맵 이미지 로드 에러:', err)
    }
    normalMapImg.src = NormalMapImg.src
  }, [imgUrl, canvasElement])

  useEyeContactsLayer({
    targetSize: targetSize,
    modelMat: modelMat,
    maskMat: maskMatRef.current
  })

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
        <ColorBrushView
          modelMat={modelMat}
          maskMatRef={maskMatRef}
          brushMaskMatRefs={brushMaskMatRefs}
          setBrushMaskMatRefs={setBrushMaskMatRefs}
        />
      ) : null}

      {/* 헤어 컬러 */}
      {isHairColor ? (
        <HairColorView modelMat={modelMat} maskMatRef={hairMaskMatRef} />
      ) : null}

      {/* 스킨 글로우 */}
      {isSkinGlow ? (
        <SkinGlowView
          modelMat={modelMat}
          normalMat={normalMat}
          maskMat={maskMatRef.current}
        />
      ) : null}

      {/* Mat 제작용 캔버스 (UI에 보여주지 않음) */}
      <canvas
        ref={canvasRef}
        style={{ position: 'absolute', left: '-9999px', top: '0' }}
      />
    </div>
  )
}
