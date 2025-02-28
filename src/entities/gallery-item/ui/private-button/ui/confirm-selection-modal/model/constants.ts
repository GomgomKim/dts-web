import { Features } from '@/shared/api/types'

export const UI_TEXT = {
  CONFIRM_YOUR_SELECTION: 'Confirm Your Selection',
  CONFIRM_YOUR_SELECTION_DESCRIPTION:
    "You're about to subscribe to this model as part of your plan.",
  CONFIRM: 'Confirm',
  MODEL: 'Model',
  PLAN: 'Plan',
  PLAN_DESCRIPTION:
    "At your next renewal, you can reselect this model \n or switch to another model if you'd like.",
  FEATURES_DESCRIPTION:
    'in AI Tools may not work well with this model, but other features are fully supported.'
} as const

export const MODEL_FEATURES_TOOLS_MAP: Record<Features, string> = {
  MAKEUP_BRUSH: 'Makeup Brush',
  SKIN_GLOW: 'Skin Glow',
  HAIR_COLOR: 'Hair Color',
  EYE_CONTACT: 'Eye Contacts',
  CREAM_TEXTURE: 'Cream Texture'
  // FRECKLES: 'Freckles',
  // AI_BACKGROUND: 'AI Background'
}
