'use client'

// import { DownloadDropdown } from '@/views/_generate/ui/DownloadDropdown'
import { BackButton } from '@/entities/back-button'

import { HeaderLayout } from '@/shared/ui/header-layout'

import { DownloadDropdown } from './ui/download-dropdown'
import { HistoryControl } from './ui/history-control'
import { ViewButton } from './ui/view-button'
import { ZoomControls } from './ui/zoom-controls'

interface CanvasHeaderProps {
  canvasRef: React.RefObject<HTMLDivElement>
}

export const CanvasHeader = (props: CanvasHeaderProps) => {
  return (
    <HeaderLayout>
      <>
        <BackButton />
        <div className="ml-10">
          <HistoryControl />
        </div>
        <div className="mx-3 text-[.875rem] text-neutral-5">Saving...</div>
        <div className="m-auto">
          <ViewButton />
        </div>
        <div className="ml-auto flex flex-nowrap gap-5">
          <ZoomControls />
          {/* TODO: 임시 containerRef에 canvasRef 할당 */}
          <DownloadDropdown containerRef={props.canvasRef} />
        </div>
      </>
    </HeaderLayout>
  )
}
