'use client'

import { useEffect, useState } from 'react'

import Image from 'next/image'

import { BrushEraseToggle } from '@/views/canvas/ui/brush-erase-toggle'

import { CanvasSidebar } from '@/widgets/canvas-sidebar'
import { AI_TOOL, AiToolId } from '@/widgets/canvas-sidebar/model/types'

import { ControlEditor } from '@/features/control-editor/ControlEditor'

import { Variation } from '@/shared/api/types'
import { cn } from '@/shared/lib/utils'

import modelImage from '/public/images/canvas-sample.png'

import {
  useCreamTextureStore,
  useEyeContactsStore
} from './model/useEditorPanelsStore'
import { useToolModeStore } from './model/useToolModeStore'
import { ColorBrush } from './ui/editor-panels/color-brush/ColorBrush'
import { CreamTexture } from './ui/editor-panels/cream-texture'
import { EyeContacts } from './ui/editor-panels/eye-contacts'
import { SkinGlow } from './ui/editor-panels/skin-glow/SkinGlow'
import { ImageView } from './ui/image-editing-box/ui/image-view'

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
          ratio: 'ASPECT_RATIO_9_16',
          angle: 'LEFT',
          encryptedImageUrl: modelImage.src
        }
      ]
    }

    setSelectedVariation(mockVariation)
  }, [])

  // AI tools 선택 상태
  const [selectedAiTool, setSelectedAiTool] = useState<AiToolId | null>(null)

  const selectedEyeContactsItem = useEyeContactsStore(
    (state) => state.selectedItem
  )

  const selectedCreamTextureItem = useCreamTextureStore(
    (state) => state.selectedItem
  )

  const selectedToolMode = useToolModeStore((state) => state.selectedTool)
  const setSelectedToolMode = useToolModeStore((state) => state.setSelectedTool)

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
          <div
            className={cn(
              'relative flex',
              'h-[45.75rem] w-[25.6626rem]',
              'shrink-0'
            )}
          >
            <ImageView selectedVariation={selectedVariation} />
          </div>
        )}
        {/* BrushEraseToggle */}
        <div className="mt-4">
          <BrushEraseToggle
            selectedToolId={selectedToolMode}
            onSelectTool={setSelectedToolMode}
          />
        </div>
      </div>

      {/* Canvas */}
      <div className="ml-[96px] h-full" ref={canvasRef}>
        <div className="absolute-center">
          {selectedEyeContactsItem ? (
            // TODO: blob으로 변경해서 투명도 조절 && index db 사용
            <Image
              src={selectedEyeContactsItem.src}
              alt={selectedEyeContactsItem.name}
              width={300}
              height={300}
            />
          ) : null}
          {selectedCreamTextureItem ? (
            // TODO: blob으로 변경해서 투명도 조절 && index db 사용
            <Image
              src={selectedCreamTextureItem.src}
              alt={selectedCreamTextureItem.name}
              width={300}
              height={300}
            />
          ) : null}
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
    </div>
  )
}

const displayEditorPanel = (selectedAiTool: AiToolId | null) => {
  switch (selectedAiTool) {
    case AI_TOOL.EYE_CONTACTS:
      return <EyeContacts id={selectedAiTool} />
    case AI_TOOL.CREAM_TEXTURE:
      return <CreamTexture id={selectedAiTool} />
    case AI_TOOL.COLOR_BRUSH:
      return <ColorBrush id={selectedAiTool} />
    case AI_TOOL.SKIN_GLOW:
      return <SkinGlow id={selectedAiTool} />
    default:
      return null
  }
}
