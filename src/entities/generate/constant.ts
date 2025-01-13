import { AspectRatio, FaceAngle, SkinTexture } from '@/shared/api/types'

export const URL_VARIATION_LIST = '/v1/image/variation-image'
export const URL_VARIATION_IMAGE = '/v1/image-file/download?encryptedImageUrl='
export const URL_AI_IMAGE_GENERATE = '/v1/image/variation-ai-image/generate'
export const URL_AI_IMAGE_GENERATE_PROGRESS =
  '/v1/image/variation-ai-image/progress'
export const URL_ASSET_REMOVE_BACKGROUND =
  '/v1/image-file/asset/remove_background'

export const ASPECT_RATIO_MAP: Record<AspectRatio, string> = {
  ASPECT_RATIO_9_16: '9:16',
  ASPECT_RATIO_1_1: '1:1'
}

export const ASPECT_RATIO_REVERT_MAP: Record<string, AspectRatio> = {
  '9:16': 'ASPECT_RATIO_9_16',
  '1:1': 'ASPECT_RATIO_1_1'
}

export const ASPECT_RATIO_MAP_NUMBER: Record<AspectRatio, number> = {
  ASPECT_RATIO_9_16: 9 / 16,
  ASPECT_RATIO_1_1: 1 / 1
}

export const FACE_ANGLE_MAP: Record<FaceAngle, string> = {
  LEFT: 'Left',
  FRONT: 'Front',
  RIGHT: 'Right'
}

export const FACE_ANGLE_REVERT_MAP: Record<string, FaceAngle> = {
  Left: 'LEFT',
  Front: 'FRONT',
  Right: 'RIGHT'
}

export const SKIN_TEXTURE_MAP: Record<SkinTexture, string> = {
  MATTE: 'Matte',
  MEDIUM: 'Medium',
  GlOWY: 'Glowy'
}
