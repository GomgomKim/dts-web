import Image from 'next/image'

import { useLayerVisibilityStore } from '@/views/canvas/model/useLayerVisibilityStore'

import { useZoomStore } from '@/widgets/canvas-header/ui/zoom-controls/model/useZoomStore'
import { AI_TOOL, AiToolId } from '@/widgets/canvas-sidebar/model/types'

import { useLayersStore } from '../lib/useLayersStore'
import { EyeContactsView } from './EyeContactsView'

export const LayeredImageView = () => {
  const baseLayer = useLayersStore((state) => state.baseLayer)
  const skinGlowLayer = useLayersStore((state) => state.skinGlowLayer)
  const colorBrushLayers = useLayersStore((state) => state.colorBrushLayers)
  const hairColorLayer = useLayersStore((state) => state.hairColorLayer)
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

  const scale = useZoomStore((state) => state.scale)

  return (
    <div
      className="absolute inset-0 size-full"
      style={{ transform: `scale(${scale})`, transformOrigin: 'top left' }}
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

        {/* 아이 컨택트 레이어 */}
        <div
          className={`absolute inset-0 z-10 ${getVisibilityClass(
            AI_TOOL.EYE_CONTACTS
          )}`}
        >
          <EyeContactsView />
        </div>
      </div>
    </div>
  )
}
