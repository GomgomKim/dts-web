import { ResData, Restriction, Variation } from '@/shared/api/types'

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

// detail - ai image progress
export interface GetAiImageProgressReqData {
  encodedImageId: string
}

export interface GetAiImageProgressResData
  extends ResData<AiImageProgressContent> {}

interface AiImageProgressContent {
  variation: Variation
}
