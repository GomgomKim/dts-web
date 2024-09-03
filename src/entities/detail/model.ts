export interface GetVariationListReqData {
  encodedBaseImageInfoId: string
}

export interface GetVariationListResData {
  code: number
  message: null | string
  content: VariationListContent
}

export interface VariationListContent {
  mainImageIndex: number
  variations: Variation[]
  restriction: Restriction
}

export interface Variation {
  encodedBaseImageId: string
  properties: Properties
  isAiGenerated: boolean
  progress: number
  encodedAiBasedImageId: string
  isFail: boolean
  isTimeout: boolean
}

export interface Restriction {
  current: number
  max: number
}

export interface Properties {
  aspectRatio: AspectRatio
  faceAngle: FaceAngle
}

export type AspectRatio =
  | 'ASPECT_RATIO_16_9'
  | 'ASPECT_RATIO_9_16'
  | 'ASPECT_RATIO_1_1'
  | 'ASPECT_RATIO_4_3'
  | 'ASPECT_RATIO_3_4'

export type FaceAngle = 'LEFT' | 'FRONT' | 'RIGHT'

export type SkinTexture = 'MATTE' | 'MEDIUM' | 'GlOWY'

//
export interface PostAiImageReqData {
  encodedBaseImageId: string
  properties: Properties
}

export interface PostAiImageResData {
  code: number
  message: null | string
  content: {
    variation: Variation
    restriction: Restriction
  }
}

export interface Restriction {
  current: number
  max: number
}

export interface GetAiImageProgressReqData {
  encodedImageId: string
}

export interface GetAiImageProgressResData {
  code: number
  message: null | string
  content: {
    variation: Variation
  }
}

export interface PostAssetRemoveBackgroundReqData {
  source: FormData
}
