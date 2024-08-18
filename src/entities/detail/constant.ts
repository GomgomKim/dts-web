import { AspectRatio, FaceAngle } from './model'

export const URL_VARIATION_LIST = '/image/base-image'
export const URL_VARIATION_LIST_IMAGE = '/image-file/base-image'
export const URL_AI_IMAGE_GENERATE = '/image/ai-image/generate'
export const URL_AI_IMAGE_GENERATE_PROGRESS = '/image-file/ai'
export const URL_GENERATED_AI_IMAGE_FILE = '/image-file/ai'
export const URL_ASSET_REMOVE_BACKGROUND = '/image-file/asset/remove_background'

export const ASPECT_RATIO_MAP: Record<AspectRatio, string> = {
  ASPECT_RATIO_16_9: '16:9',
  ASPECT_RATIO_9_16: '9:16',
  ASPECT_RATIO_1_1: '1:1',
  ASPECT_RATIO_4_3: '4:3',
  ASPECT_RATIO_3_4: '3:4'
}

export const ASPECT_RATIO_REVERT_MAP: Record<string, AspectRatio> = {
  '16:9': 'ASPECT_RATIO_16_9',
  '9:16': 'ASPECT_RATIO_9_16',
  '1:1': 'ASPECT_RATIO_1_1',
  '4:3': 'ASPECT_RATIO_4_3',
  '3:4': 'ASPECT_RATIO_3_4'
}

export const ASPECT_RATIO_MAP_NUMBER: Record<AspectRatio, number> = {
  ASPECT_RATIO_16_9: 16 / 9,
  ASPECT_RATIO_4_3: 4 / 3,
  ASPECT_RATIO_1_1: 1 / 1,
  ASPECT_RATIO_3_4: 3 / 4,
  ASPECT_RATIO_9_16: 9 / 16
}

export const FACE_ANGLE_MAP: Record<FaceAngle, string> = {
  LEFT: 'Left',
  FRONT: 'Front',
  RIGHT: 'Right'
}

export const FACE_ANGLE_REVERT_MAP = {
  Left: 'LEFT',
  Front: 'FRONT',
  Right: 'RIGHT'
} as const
