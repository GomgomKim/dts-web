import { useEffect, useState } from 'react'

import Image from 'next/image'

import { lensPositions } from '@/views/canvas/model/LensDummyData'
import { useEyeContactsStore } from '@/views/canvas/model/useEditorPanelsStore'
import { useLayerVisibilityStore } from '@/views/canvas/model/useLayerVisibilityStore'

import { AI_TOOL, AiToolId } from '@/widgets/canvas-sidebar/model/types'

import { useLayersStore } from '../lib/useLayersStore'
import { MovableEyeContacts } from './MovableEyeContacts'

export const LayeredImageView = () => {
  const baseLayer = useLayersStore((state) => state.baseLayer)
  const skinGlowLayer = useLayersStore((state) => state.skinGlowLayer)
  const colorBrushLayers = useLayersStore((state) => state.colorBrushLayers)
  const hairColorLayer = useLayersStore((state) => state.hairColorLayer)
  const eyeContactsLayer = useLayersStore((state) => state.eyeContactsLayer)
  const activeToolVisibility = useLayerVisibilityStore(
    (state) => state.activeToolVisibility
  )
  const globalVisibility = useLayerVisibilityStore(
    (state) => state.globalVisibility
  )
  const activeTool = useLayerVisibilityStore((state) => state.activeTool)

  const isActiveTool = (tool: AiToolId) => {
    return activeTool === tool
  }

  const getVisibilityClass = (tool: AiToolId) => {
    if (!isActiveTool(tool)) return 'block'
    return activeToolVisibility ? 'block' : 'hidden'
  }

  // 렌즈 위치 계산 (Aspect Ratio '1:1')
  const lensPosData = lensPositions('ASPECT_RATIO_1_1')
  const leftEyePos = lensPosData.left_eye
  const rightEyePos = lensPosData.right_eye

  // 렌즈 위치 계산을 위한 스케일 (원본 width: 1280, targetSize: 예시 732)
  const targetSize = 732
  const originalWidth = 1280
  const scale = targetSize / originalWidth

  // EyeContacts 관련 상태
  const selectedEyeContactsItem = useEyeContactsStore(
    (state) => state.selectedItem
  )
  useEffect(() => {
    if (selectedEyeContactsItem) {
      setShowEyeContactsBorder(true)
    }
  }, [selectedEyeContactsItem])
  const eyeContactsTransparency = useEyeContactsStore(
    (state) => state.transparency
  )
  const [showEyeContactsBorder, setShowEyeContactsBorder] = useState(true)

  return (
    <div
      className="absolute inset-0 size-full"
      onClick={() => setShowEyeContactsBorder(false)}
    >
      {/* 기본 이미지 레이어 */}
      {baseLayer && (
        <div className="absolute inset-0">
          <Image
            src={baseLayer}
            alt="Base"
            fill
            style={{ objectFit: 'contain' }}
            priority
          />
        </div>
      )}

      <div
        className={`absolute inset-0 size-full ${globalVisibility ? 'block' : 'hidden'}`}
      >
        {/* 스킨 글로우 레이어 */}
        {skinGlowLayer && (
          <div
            className={`absolute inset-0 z-40 ${getVisibilityClass(
              AI_TOOL.SKIN_GLOW
            )}`}
            style={{ pointerEvents: 'none' }}
          >
            <Image
              src={skinGlowLayer}
              alt="Skin Glow"
              fill
              style={{ objectFit: 'contain' }}
              priority
            />
          </div>
        )}

        {/* 컬러 브러시 레이어들 */}
        {Object.entries(colorBrushLayers).map(([brushId, base64]) => (
          <div
            key={brushId}
            className={`absolute inset-0 z-30 ${getVisibilityClass(
              AI_TOOL.COLOR_BRUSH
            )}`}
            style={{ pointerEvents: 'none' }}
          >
            <Image
              src={base64}
              alt={`Brush ${brushId}`}
              fill
              style={{ objectFit: 'contain' }}
              priority
            />
          </div>
        ))}

        {/* 헤어 컬러 레이어 */}
        {hairColorLayer && (
          <div
            className={`absolute inset-0 z-20 ${getVisibilityClass(
              AI_TOOL.HAIR_COLOR
            )}`}
            style={{ pointerEvents: 'none' }}
          >
            <Image
              src={hairColorLayer}
              alt="Hair Color"
              fill
              style={{ objectFit: 'contain' }}
              priority
            />
          </div>
        )}

        {/* 아이 컨택트 렌즈 및 fore 레이어 */}
        <div
          className={`absolute inset-0 z-10 ${getVisibilityClass(
            AI_TOOL.EYE_CONTACTS
          )}`}
        >
          {/* 왼쪽 렌즈 */}
          {selectedEyeContactsItem && leftEyePos && (
            <MovableEyeContacts
              initialLeft={leftEyePos.xmin * scale}
              initialTop={leftEyePos.ymin * scale}
              initialWidth={(leftEyePos.xmax - leftEyePos.xmin) * scale}
              initialHeight={(leftEyePos.ymax - leftEyePos.ymin) * scale}
              imageAsset={selectedEyeContactsItem}
              transparency={eyeContactsTransparency / 100}
              alt="Left Eye Contact"
              isShowBorder={showEyeContactsBorder}
              setIsShowBorder={setShowEyeContactsBorder}
            />
          )}

          {/* 오른쪽 렌즈 */}
          {selectedEyeContactsItem && rightEyePos && (
            <MovableEyeContacts
              initialLeft={rightEyePos.xmin * scale}
              initialTop={rightEyePos.ymin * scale}
              initialWidth={(rightEyePos.xmax - rightEyePos.xmin) * scale}
              initialHeight={(rightEyePos.ymax - rightEyePos.ymin) * scale}
              imageAsset={selectedEyeContactsItem}
              transparency={eyeContactsTransparency / 100}
              alt="Right Eye Contact"
              isShowBorder={showEyeContactsBorder}
              setIsShowBorder={setShowEyeContactsBorder}
            />
          )}

          {/* fore 레이어 (렌즈 위에 덮어서 자연스런 눈 효과 생성) */}
          {eyeContactsLayer && (
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: 12,
                pointerEvents: 'none'
              }}
            >
              <Image
                src={eyeContactsLayer}
                alt="Fore Layer for Eye Contacts"
                fill
                style={{ objectFit: 'contain' }}
                priority
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
