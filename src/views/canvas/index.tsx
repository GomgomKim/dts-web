'use client'

import { CanvasSidebar } from '@/widgets/canvas-sidebar'

// import Swatch from '/public/images/swatch.png'

export default function Canvas({
  canvasRef
}: {
  canvasRef: React.RefObject<HTMLDivElement>
}) {
  // Canvas 관련 상태들

  return (
    <div className="size-full bg-[url('/images/swatch.png')]">
      {/* Sidebar */}
      <div className="fixed h-full w-[96px] bg-background">
        <CanvasSidebar />
      </div>

      {/* Canvas */}
      <div className="ml-[96px] h-full" ref={canvasRef}></div>
    </div>
  )
}
