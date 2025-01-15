export interface ResData<T> {
  code: number
  message: null | string
  content: T
}

export interface ScrollContent {
  data: MainItem[]
  hasNext: boolean
  scrollKey: string
}

export interface MainItem {
  id: number
  name: string
  description: string
  isFavorite: boolean
  encryptedThumbnailPath: string
  tags: string[] // TODO: 타입 구체화
}

export interface Variation {
  variationId: number
  isAiGenerated: boolean
  images: VariationImage[]
  progress: number
}

export interface VariationImage {
  ratio: AspectRatio
  angle: FaceAngle
  encryptedImageUrl: string
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

export interface AuthProfile {
  email: string
  profileImageUrl: string
  restriction: Restriction
}

export type AssetType = 'BRAND' | 'CREAM' | 'CONTACT_LENS'

export interface Asset {
  id: number // TODO: change to string
  assetType: AssetType
  isPublic: boolean
  encryptedAssetUrl: string
  encryptedDepthMapUrl?: string
}
