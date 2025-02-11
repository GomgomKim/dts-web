'use client'

import { useEffect, useRef, useState } from 'react'

import { composeFinalImage } from '@/views/canvas/lib/layerManager'
import { LayersState } from '@/views/canvas/lib/layerManager'

interface LayeredImageViewProps {
  baseMat: cv.Mat // 기본 모델 이미지 (RGBA)
  skinGlowMat?: cv.Mat
  colorBrushMats?: cv.Mat[] // 8개의 컬러브러시 레이어 (RGBA)
  hairColorMat?: cv.Mat
  eyeContactsMat?: cv.Mat
}

export const LayeredImageView = (props: LayeredImageViewProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [finalMat, setFinalMat] = useState<cv.Mat | null>(null)

  // 효과 업데이트 시 레이어를 합성
  useEffect(() => {
    const layers: LayersState = {
      base: props.baseMat,
      skinGlow: props.skinGlowMat,
      colorBrushLayers: props.colorBrushMats,
      hairColor: props.hairColorMat,
      eyeContacts: props.eyeContactsMat
    }

    const composed = composeFinalImage(layers)
    setFinalMat(composed)

    // 메모리 관리: 이전 finalMat 해제 등 필요한 처리
    return () => {
      // composed.delete(); // 필요 시 cleanup
    }
  }, [
    props.baseMat,
    props.skinGlowMat,
    props.colorBrushMats,
    props.hairColorMat,
    props.eyeContactsMat
  ])

  // finalMat을 canvas에 렌더링
  useEffect(() => {
    if (!finalMat || !canvasRef.current) return

    canvasRef.current.width = finalMat.cols
    canvasRef.current.height = finalMat.rows
    cv.imshow(canvasRef.current, finalMat)
  }, [finalMat])

  return <canvas ref={canvasRef} />
}
