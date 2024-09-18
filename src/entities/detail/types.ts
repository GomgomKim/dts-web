import { Properties, ResData, Restriction, Variation } from '@/shared/api/types'

// detail - variation list
export interface GetVariationListReqData {
  encodedBaseImageInfoId: string
}

export interface GetVariationListResData
  extends ResData<VariationListContent> {}

export interface VariationListContent {
  mainImageIndex: number
  variations: Variation[]
  restriction: Restriction
}

// detail - create new variation
export interface PostAiImageReqData {
  encodedBaseImageId: string
  properties: Properties
}

export interface PostAiImageResData extends ResData<PostAiImageContent> {}

interface PostAiImageContent {
  variation: Variation
  restriction: Restriction
}

// detail - ai image progress
export interface GetAiImageProgressReqData {
  encodedImageId: string
}

// detail - brand asset
export interface PostRemoveBackgroundReqData {
  source: FormData
}

export interface GetAiImageProgressResData
  extends ResData<AiImageProgressContent> {}

interface AiImageProgressContent {
  variation: Variation
}
