import { useEffect, useRef, useState } from 'react'
import { Image as KonvaImage, Layer, Stage, Transformer } from 'react-konva'

import { lensPositions } from '@/views/canvas/model/LensDummyData'
import { useEyeContactsStore } from '@/views/canvas/model/useEditorPanelsStore'
import { useGlobalHistoryStore } from '@/views/canvas/model/useGlobalHistoryStore'
import { useLayerVisibilityStore } from '@/views/canvas/model/useLayerVisibilityStore'

import { AI_TOOL } from '@/widgets/canvas-sidebar/model/types'

import Konva from 'konva'
import useImage from 'use-image'

import { useLayersStore } from '../lib/useLayersStore'
import { EyeData } from '../model/types'
import { FlexibleEyeContact } from './FlexibleEyeContact'

export const EyeContactsView = () => {
  const targetSize = 732
  const scale = 732 / 1280
  const selectedEyeContactsItem = useEyeContactsStore(
    (state) => state.selectedItem
  )
  const eyeContactsTransparency = useEyeContactsStore(
    (state) => state.transparency
  )
  const lensPosData = lensPositions('ASPECT_RATIO_1_1')
  const initialLeftEyePos = lensPosData.left_eye
  const initialRightEyePos = lensPosData.right_eye
  const initialLeft = initialLeftEyePos.xmin * scale
  const initialLeftTop = initialLeftEyePos.ymin * scale
  const initialLeftWidth =
    (initialLeftEyePos.xmax - initialLeftEyePos.xmin) * scale
  const initialLeftHeight =
    (initialLeftEyePos.ymax - initialLeftEyePos.ymin) * scale
  const initialRight = initialRightEyePos.xmin * scale
  const initialRightTop = initialRightEyePos.ymin * scale
  const initialRightWidth =
    (initialRightEyePos.xmax - initialRightEyePos.xmin) * scale
  const initialRightHeight =
    (initialRightEyePos.ymax - initialRightEyePos.ymin) * scale

  const [showEyeContactsBorder, setShowEyeContactsBorder] = useState(true)

  const eyeContactsLayer = useLayersStore((state) => state.eyeContactsLayer)

  const activeTool = useLayerVisibilityStore((state) => state.activeTool)

  const [image] = useImage(eyeContactsLayer)

  const stageRef = useRef<Konva.Stage>(null)
  const transformerRef = useRef<Konva.Transformer>(null)
  const leftEyeImageRef = useRef<Konva.Image>(null)
  const rightEyeImageRef = useRef<Konva.Image>(null)

  const leftEyeAttachTransformer = () => {
    if (transformerRef.current && leftEyeImageRef.current) {
      transformerRef.current.nodes([leftEyeImageRef.current])
      transformerRef.current.getLayer()?.batchDraw()
      transformerRef.current.moveToTop()
    }
    saveHistory()
  }

  const rightEyeAttachTransformer = () => {
    if (transformerRef.current && rightEyeImageRef.current) {
      transformerRef.current.nodes([rightEyeImageRef.current])
      transformerRef.current.getLayer()?.batchDraw()
      transformerRef.current.moveToTop()
    }
    saveHistory()
  }

  const saveHistory = () => {
    if (stageRef.current) {
      const snapshot = stageRef.current.toJSON()
      useGlobalHistoryStore.getState().addEntry('eyeContact', snapshot, null)
    }
  }

  const [leftEyePos, setLeftEyePos] = useState<EyeData>({
    x: initialLeft,
    y: initialLeftTop,
    width: initialLeftWidth,
    height: initialLeftHeight
  })
  const [rightEyePos, setRightEyePos] = useState<EyeData>({
    x: initialRight,
    y: initialRightTop,
    width: initialRightWidth,
    height: initialRightHeight
  })

  const [eyeContactsData, setEyeContactsData] = useState<string | null>(null)

  const currentIndex = useGlobalHistoryStore((state) => state.currentIndex)
  const globalHistory = useGlobalHistoryStore((state) => state.globalHistory)

  const currentData = globalHistory[currentIndex]

  useEffect(() => {
    if (currentData && currentData.layer === 'eyeContact') {
      setEyeContactsData(currentData.base64)
    }
  }, [currentData])

  useEffect(() => {
    if (eyeContactsData) {
      try {
        const stageData = JSON.parse(eyeContactsData)
        // stageData 구조: { className: "Stage", children: [{ ... Layer ... }] }
        if (
          stageData &&
          Array.isArray(stageData.children) &&
          stageData.children.length > 0
        ) {
          const layer = stageData.children[0] // 보통 첫 번째 Layer를 사용함
          if (layer && Array.isArray(layer.children)) {
            // Image 타입의 노드에서 alt 속성으로 구분
            const leftEyeData = layer.children.find(
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              (node: any) =>
                node.className === 'Image' &&
                node.attrs.alt === 'Left Eye Contact'
            )
            const rightEyeData = layer.children.find(
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              (node: any) =>
                node.className === 'Image' &&
                node.attrs.alt === 'Right Eye Contact'
            )
            if (leftEyeData) {
              setLeftEyePos({
                x: leftEyeData.attrs.x,
                y: leftEyeData.attrs.y,
                width: leftEyeData.attrs.width,
                height: leftEyeData.attrs.height
              })
            }
            if (rightEyeData) {
              setRightEyePos({
                x: rightEyeData.attrs.x,
                y: rightEyeData.attrs.y,
                width: rightEyeData.attrs.width,
                height: rightEyeData.attrs.height
              })
            }
          }
        }
      } catch (error) {
        console.error('eyeContactsData 파싱 에러:', error)
      }
    }
  }, [eyeContactsData])

  return (
    <Stage
      ref={stageRef}
      width={targetSize}
      height={targetSize}
      onClick={() => setShowEyeContactsBorder(false)}
    >
      <Layer>
        {/* 왼쪽 렌즈 */}
        {selectedEyeContactsItem && leftEyePos && (
          <FlexibleEyeContact
            ref={leftEyeImageRef}
            attachTransformer={leftEyeAttachTransformer}
            initialLeft={leftEyePos.x}
            initialTop={leftEyePos.y}
            initialWidth={leftEyePos.width}
            initialHeight={leftEyePos.height}
            imageAsset={selectedEyeContactsItem}
            transparency={eyeContactsTransparency / 100}
            alt="Left Eye Contact"
            isShowBorder={showEyeContactsBorder}
            setIsShowBorder={setShowEyeContactsBorder}
          />
        )}

        {/* 오른쪽 렌즈 */}
        {selectedEyeContactsItem && rightEyePos && (
          <FlexibleEyeContact
            ref={rightEyeImageRef}
            attachTransformer={rightEyeAttachTransformer}
            initialLeft={rightEyePos.x}
            initialTop={rightEyePos.y}
            initialWidth={rightEyePos.width}
            initialHeight={rightEyePos.height}
            imageAsset={selectedEyeContactsItem}
            transparency={eyeContactsTransparency / 100}
            alt="Right Eye Contact"
            isShowBorder={showEyeContactsBorder}
            setIsShowBorder={setShowEyeContactsBorder}
          />
        )}

        {eyeContactsLayer && (
          <KonvaImage
            image={image}
            alt="fore layer"
            x={0}
            y={0}
            width={targetSize}
            height={targetSize}
            listening={false}
          />
        )}

        <Transformer
          ref={transformerRef}
          rotateEnabled={false}
          enabledAnchors={[
            'top-left',
            'top-right',
            'bottom-left',
            'bottom-right'
          ]}
          boundBoxFunc={(oldBox, newBox) => newBox}
          anchorStroke="#6EFFB6"
          anchorFill="#6EFFB6"
          anchorSize={9}
          borderStroke="#6EFFB6"
          anchorCornerRadius={5}
          visible={activeTool === AI_TOOL.EYE_CONTACTS && showEyeContactsBorder}
          zIndex={20}
        />
      </Layer>
    </Stage>
  )
}
