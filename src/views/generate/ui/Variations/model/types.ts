import { ResData, Restriction, Variation } from '@/shared/api/types'

// detail - variation list
export interface GetVariationListReqData {
  mainImageId: string
}

export interface GetVariationListResData
  extends ResData<VariationListContent> {}

export interface VariationListContent {
  variations: Variation[]
  tags: string[] // TODO: 타입 구체화
  restriction: Restriction
}

// detail - ai image progress
export interface GetAiImageProgressReqData {
  variationImageId: number
}

export interface GetAiImageProgressResData
  extends ResData<AiImageProgressContent> {}

interface AiImageProgressContent {
  variation: Variation
}
