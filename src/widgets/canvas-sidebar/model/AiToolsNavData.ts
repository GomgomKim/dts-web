import { ComponentType, SVGProps } from 'react'

import AiBackground from '/public/icons/ai-background.svg'
import ColorBrush from '/public/icons/color-brush.svg'
import CreamTexture from '/public/icons/cream-texture.svg'
import EyeContacts from '/public/icons/eye-contacts.svg'
import Freckles from '/public/icons/freckles.svg'
import SkinGlow from '/public/icons/skin-glow.svg'

import { AI_TOOL } from './types'

interface MenuItem {
  id: string
  title: string
  icon: ComponentType<SVGProps<SVGSVGElement>>
  disabled?: boolean
}

export const AI_TOOLS: MenuItem[] = [
  {
    id: AI_TOOL.COLOR_BRUSH,
    title: 'Color Brush',
    icon: ColorBrush
  },
  {
    id: AI_TOOL.SKIN_GLOW,
    title: 'Skin Glow',
    icon: SkinGlow
  },
  {
    id: AI_TOOL.EYE_CONTACTS,
    title: 'Eye Contacts',
    icon: EyeContacts
  },
  {
    id: AI_TOOL.CREAM_TEXTURE,
    title: 'Cream Texture',
    icon: CreamTexture
  },
  {
    id: AI_TOOL.FRECKLES,
    title: 'Freckles',
    icon: Freckles,
    disabled: true
  },
  {
    id: AI_TOOL.AI_BACKGROUND,
    title: 'AI Background',
    icon: AiBackground,
    disabled: true
  }
]
