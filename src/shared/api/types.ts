export interface ResData<T> {
  code: number
  message: null | string
  content: T
}

export interface ScrollContent {
  images: ModelImageItem[]
  hasNext: boolean
  scrollKey: string
}

export interface ModelImageItem {
  encodedImageInfoId: string
  name: string
  description: string
  isFavorite: boolean
  encodedMainImageId: string
}

export interface Variation {
  encodedBaseImageId: string
  properties: Properties
  isAiGenerated: boolean
  encryptedImageUrl: string
  progress: number
  encodedAiBasedImageId: string
  isFail: boolean
  isTimeout: boolean
  // TODO: temp
  variations?: Variation[]
}

export interface Properties {
  aspectRatio: AspectRatio
  faceAngle: FaceAngle
}

export type AspectRatio = 'ASPECT_RATIO_9_16' | 'ASPECT_RATIO_1_1'

export type FaceAngle = 'LEFT' | 'FRONT' | 'RIGHT'

export type SkinTexture = 'MATTE' | 'MEDIUM' | 'GlOWY'

export interface Restriction {
  current: number
  max: number
}

export interface Tokens {
  accessToken: string
  refreshToken: string
}
