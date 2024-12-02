'use client'

import { CanvasSidebar } from '@/widgets/canvas-sidebar'

export default function Canvas() {
  // Canvas 관련 상태들

  return (
    <div className="flex size-full">
      {/* Sidebar */}
      <div className="fixed z-20 h-[calc(100%-64px-20px)] w-[320px] bg-background px-5">
        <CanvasSidebar />
      </div>

      {/* Canvas */}
      <div className="ml-[320px] h-full grow">
        <div className="flex h-full gap-5">
          <section className="shrink-0 grow basis-[400px] overflow-y-auto overflow-x-hidden">
            <div className="relative min-h-[391px] grow xl:min-h-[640px]"></div>
          </section>
        </div>
      </div>
    </div>
  )
}
