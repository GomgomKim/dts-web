'use client'

import { useState } from 'react'

import Image from 'next/image'

import { CanvasSidebar } from '@/widgets/canvas-sidebar'
import { AI_TOOL, AiToolId } from '@/widgets/canvas-sidebar/model/types'

import {
  useCreamTextureStore,
  useEyeContactsStore
} from './model/useEditorPanelsStore'
import { CreamTexture } from './ui/editor-panels/cream-texture'
import { EyeContacts } from './ui/editor-panels/eye-contacts'

// import Swatch from '/public/images/swatch.png'

export default function Canvas({
  canvasRef
}: {
  canvasRef: React.RefObject<HTMLDivElement>
}) {
  // Canvas 관련 상태들

  // AI tools 선택 상태
  const [selectedAiTool, setSelectedAiTool] = useState<AiToolId | null>(null)

  const selectedEyeContactsItem = useEyeContactsStore(
    (state) => state.selectedItem
  )

  const selectedCreamTextureItem = useCreamTextureStore(
    (state) => state.selectedItem
  )

  return (
    <div className="size-full bg-[url('/images/swatch.png')]">
      {/* Sidebar */}
      <div className="fixed h-full w-[96px] bg-background">
        <CanvasSidebar
          selectedAiTool={selectedAiTool}
          onClickAiTool={(id: AiToolId) => setSelectedAiTool(id)}
        />
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
    default:
      return null
  }
}
