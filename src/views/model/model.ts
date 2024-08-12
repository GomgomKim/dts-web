export interface GetVariationListReqData {
  encodedBaseImageId: string
}

export interface GetVariationListResData {
  code: number
  message: null | string
  content: VariationListContent
}

export interface VariationListContent {
  main: MainVariation
  variations: Variation[]
}

export interface MainVariation {
  encodedBaseImageId: string
}

export interface Variation {
  encodedBaseImageId: string
  properties: Properties
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

export interface PostAiImageReqData {
  encodedBaseImageId: string
  properties: Properties
}

export interface PostAiImageResData {
  code: number
  message: null | string
  content: {
    encodedGenerateId: string
  }
}

export interface GetAiImageProgressReqData {
  encodedGenerateId: string
}

export interface GetAiImageProgressResData {
  code: number
  message: null | string
  content: {
    progress: number
  }
}
