import { ComponentType, SVGProps } from 'react'

import AiTools from '/public/icons/ai-tools.svg'
import Assets from '/public/icons/assets-icon.svg'
import Models from '/public/icons/models-icon.svg'

import { CANVAS_NAV } from './types'

/**
 * 캔버스 네비게이션 메뉴 아이템의 인터페이스
 * @interface MenuItem
 * @property {string} id - 메뉴 아이템의 고유 식별자
 * @property {string} title - 메뉴 아이템의 표시 텍스트
 * @property {ComponentType<SVGProps<SVGSVGElement>>} icon - 메뉴 아이템의 SVG 아이콘 컴포넌트
 * @property {boolean} hasSubMenu - 서브 메뉴 존재 여부 (TODO: 세 메뉴 모두 추가되면 삭제 하기)
 */
interface MenuItem {
  id: string
  title: string
  icon: ComponentType<SVGProps<SVGSVGElement>>
  hasSubMenu: boolean
}

export const CANVAS_NAV_ITEMS: MenuItem[] = [
  {
    id: CANVAS_NAV.AI_TOOLS,
    title: 'AI Tools',
    icon: AiTools,
    hasSubMenu: true
  },
  {
    id: CANVAS_NAV.ASSETS,
    title: 'Assets',
    icon: Assets,
    hasSubMenu: false
  },
  {
    id: CANVAS_NAV.MODELS,
    title: 'Models',
    icon: Models,
    hasSubMenu: false
  }
] as const
