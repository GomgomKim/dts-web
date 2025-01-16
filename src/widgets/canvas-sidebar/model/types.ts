import { AI_TOOLS } from './AiToolsNavData'
import { CANVAS_NAV_ITEMS } from './CanvasNavData'

export type CanvasNavId = (typeof CANVAS_NAV_ITEMS)[number]['id']

export type AiToolId = (typeof AI_TOOLS)[number]['id']

export const CANVAS_NAV = {
  AI_TOOLS: 'ai-tools',
  ASSETS: 'assets',
  MODELS: 'models'
} as const

export const AI_TOOL = {
  COLOR_BRUSH: 'color-brush',
  SKIN_GLOW: 'skin-glow',
  HAIR_COLOR: 'hair-color',
  EYE_CONTACTS: 'eye-contacts',
  CREAM_TEXTURE: 'cream-texture',
  FRECKLES: 'freckles',
  AI_BACKGROUND: 'ai-background'
} as const
