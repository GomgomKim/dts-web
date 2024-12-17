'use client'

import { useState } from 'react'

import { cn } from '@/shared/lib/utils'
import { Badge, Button } from '@/shared/ui'

import SidebarLeft from '/public/icons/sidebar-left.svg'
import SidebarRight from '/public/icons/sidebar-right.svg'

import { AI_TOOLS } from './model/AiToolsNavData'
import { CANVAS_NAV_ITEMS } from './model/CanvasNavData'
import { AiToolId, CANVAS_NAV, CanvasNavId } from './model/types'
import { CanvasNavIcon } from './ui'

interface CanvasSidebarProps {
  selectedAiTool: AiToolId | null
  onClickAiTool: (id: AiToolId) => void
}

export const CanvasSidebar = (props: CanvasSidebarProps) => {
  // 메인 메뉴 활성화 상태 (AItools, Assets, Models)
  const [activeMenu, setActiveMenu] = useState<CanvasNavId | null>(null)

  // 서브메뉴 확장/축소 상태
  const [isSubOpen, setIsSubOpen] = useState<boolean>(true)

  return (
    <div className="fixed h-screen">
      {/* 메인 네비게이션 메뉴 */}
      <div className="absolute left-0 top-0 z-10 h-full w-[96px] bg-background">
        <div className="flex flex-col items-center">
          {CANVAS_NAV_ITEMS.map((item) => (
            <div key={item.id} className="relative h-[93px] w-[80px]">
              <Button
                variant="ghost"
                onClick={() => {
                  setActiveMenu(item.id)
                  setIsSubOpen(true)
                }}
                isActive={activeMenu === item.id}
                className="flex size-full flex-col items-center gap-3 rounded-[.5rem]"
              >
                <CanvasNavIcon icon={item.icon} />
                <span className="text-[14px] font-medium">{item.title}</span>
              </Button>
            </div>
          ))}
        </div>
      </div>

      {/* AI Tools 서브메뉴 패널 */}
      <div
        className={cn(
          'absolute left-0 top-0 z-10 h-full w-[284px] bg-background pr-2 transition-all duration-500',
          activeMenu === CANVAS_NAV.AI_TOOLS && isSubOpen
            ? 'pointer-events-auto translate-x-24 opacity-100'
            : 'pointer-events-none translate-x-10 opacity-0'
        )}
      >
        {/* 서브메뉴 헤더 */}
        <div className="flex items-center justify-between self-stretch py-2 pl-3">
          <span className="text-[20px] font-semibold text-white">AI Tools</span>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsSubOpen(false)}
            className="size-6 p-2"
          >
            <CanvasNavIcon icon={SidebarLeft} />
          </Button>
        </div>

        {/* AI Tools 하위 목록 */}
        {AI_TOOLS.map((tool) => (
          <Button
            key={tool.id}
            variant="ghost"
            disabled={tool.disabled}
            onClick={() => props.onClickAiTool(tool.id)}
            isActive={props.selectedAiTool === tool.id}
            className="flex h-[56px] w-full justify-start gap-3 rounded-[.5rem] px-4 py-5"
          >
            <CanvasNavIcon icon={tool.icon} />
            <span className="text-[14px] font-medium">{tool.title}</span>
            {tool.disabled && <Badge>Upcoming</Badge>}
          </Button>
        ))}
      </div>

      {/* 서브메뉴 열기 버튼 (축소 상태일 때만 표시) */}
      {!isSubOpen ? (
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsSubOpen(true)}
          className="absolute left-[108px] top-4 z-30 size-6 p-0"
        >
          <CanvasNavIcon icon={SidebarRight} />
        </Button>
      ) : null}
    </div>
  )
}
