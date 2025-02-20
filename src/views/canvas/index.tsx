'use client'

import { useEffect, useState } from 'react'

import Image from 'next/image'

import { BrushEraseToggle } from '@/views/canvas/ui/brush-erase-toggle'

import { CanvasSidebar } from '@/widgets/canvas-sidebar'
import { AI_TOOL, AiToolId } from '@/widgets/canvas-sidebar/model/types'

import { ControlEditor } from '@/features/control-editor/ControlEditor'

import { DummyData } from '@/entities/recent-items/model/types'

import { Variation } from '@/shared/api/types'
import { cn } from '@/shared/lib/utils'

import modelImage from '/public/images/image.png'
import modelImageEye from '/public/images/lens-back.png'

import { getAssetUrl } from './lib/getAssetUrl'
import {
  useCreamTextureStore // useEyeContactsStore
} from './model/useEditorPanelsStore'
import { useToolModeStore } from './model/useToolModeStore'
import { AddRemoveToggle } from './ui/add-remove-toggle'
import { useBrandAssetsStore } from './ui/brand-assets/model/useBrandAssetsStore'
import { ColorBrush } from './ui/editor-panels/color-brush/ColorBrush'
import { CreamTexture } from './ui/editor-panels/cream-texture'
import { EyeContacts } from './ui/editor-panels/eye-contacts'
import { HairColor } from './ui/editor-panels/hair-color/HairColor'
import { SkinGlow } from './ui/editor-panels/skin-glow/SkinGlow'
import { ImageView } from './ui/image-editing-box/ui/image-view'
import { RevertToOriginalModal } from './ui/image-editing-box/ui/revert-to-original'

export default function Canvas({
  canvasRef
}: {
  canvasRef: React.RefObject<HTMLDivElement>
}) {
  // Canvas 관련 상태들
  const [selectedVariation, setSelectedVariation] = useState<Variation | null>(
    null
  )

  useEffect(() => {
    const mockVariation: Variation = {
      variationId: 1,
      isAiGenerated: false,
      progress: 0,
      images: [
        {
          ratio: 'ASPECT_RATIO_1_1',
          angle: 'LEFT',
          encryptedImageUrl: modelImage.src, // lens-back
          lensFore: modelImageEye.src
        }
      ]
    }

    setSelectedVariation(mockVariation)
  }, [])

  // AI tools 선택 상태
  const [selectedAiTool, setSelectedAiTool] = useState<AiToolId | null>(null)

  // const selectedEyeContactsItem = useEyeContactsStore(
  //   (state) => state.selectedItem
  // )

  const selectedCreamTextureItem = useCreamTextureStore(
    (state) => state.selectedItem
  )

  const selectedBrandAssetItems = useBrandAssetsStore(
    (state) => state.selectedItems
  )

  const selectedToolMode = useToolModeStore((state) => state.selectedTool)
  const setSelectedToolMode = useToolModeStore((state) => state.setSelectedTool)

  const isShowBrushEraseToggle = (toolId: AiToolId | null): boolean => {
    return toolId === AI_TOOL.COLOR_BRUSH
  }

  const isShowAddRemoveToggle = (toolId: AiToolId | null): boolean => {
    return toolId === AI_TOOL.HAIR_COLOR
  }

  return (
    <div className="size-full bg-[url('/images/swatch.png')]">
      {/* Sidebar */}
      <div className="fixed h-full w-[96px] bg-background">
        <CanvasSidebar
          selectedAiTool={selectedAiTool}
          onClickAiTool={(id: AiToolId) => setSelectedAiTool(id)}
        />
      </div>

      <div className={cn('flex w-full', 'flex-col items-center')}>
        {/* ImageView */}
        {selectedVariation && (
          <div className={cn('relative flex', 'size-[45.75rem]', 'shrink-0')}>
            <ImageView
              selectedVariation={selectedVariation}
              selectedAiTool={selectedAiTool}
            />
          </div>
        )}
        {/* BrushEraseToggle */}
        <div className="mt-4">
          {isShowBrushEraseToggle(selectedAiTool) ? (
            <BrushEraseToggle
              selectedToolId={selectedToolMode}
              onSelectTool={setSelectedToolMode}
            />
          ) : null}
        </div>

        {/* AddRemoveToggle */}
        <div className="mt-4">
          {isShowAddRemoveToggle(selectedAiTool) ? <AddRemoveToggle /> : null}
        </div>
      </div>

      {/* Canvas */}
      <div className="ml-[96px] h-full" ref={canvasRef}>
        <div className="absolute-center">
          {/* {selectedEyeContactsItem ? (
            // TODO: blob으로 변경해서 투명도 조절 && index db 사용
            <Image
              src={getAssetUrl(selectedEyeContactsItem)}
              alt={(selectedEyeContactsItem as DummyData).name || ''}
              width={100}
              height={100}
            />
          ) : null} */}
          {selectedCreamTextureItem ? (
            // TODO: blob으로 변경해서 투명도 조절 && index db 사용
            <Image
              src={getAssetUrl(selectedCreamTextureItem)}
              alt={(selectedCreamTextureItem as DummyData).name || ''}
              width={100}
              height={100}
            />
          ) : null}
          {selectedBrandAssetItems
            ? selectedBrandAssetItems.map((item, index) => (
                <Image
                  key={index}
                  src={getAssetUrl(item)}
                  alt=""
                  width={100}
                  height={100}
                />
              ))
            : null}
        </div>
      </div>

      {/* Editor Panel */}
      <div className="absolute right-3 top-[calc(56px+20px)]">
        {displayEditorPanel(selectedAiTool)}
        {selectedAiTool ? <ControlEditor /> : null}
        <div
          className="ml-[96px] flex h-full justify-center pt-8"
          ref={canvasRef}
        ></div>
      </div>

      <RevertToOriginalModal />
    </div>
  )
}

const displayEditorPanel = (selectedAiTool: AiToolId | null) => {
  switch (selectedAiTool) {
    case AI_TOOL.EYE_CONTACTS:
      return <EyeContacts />
    case AI_TOOL.CREAM_TEXTURE:
      return <CreamTexture />
    case AI_TOOL.COLOR_BRUSH:
      return <ColorBrush id={selectedAiTool} />
    case AI_TOOL.SKIN_GLOW:
      return <SkinGlow />
    case AI_TOOL.HAIR_COLOR:
      return <HairColor id={selectedAiTool} />
    default:
      return null
  }
}
