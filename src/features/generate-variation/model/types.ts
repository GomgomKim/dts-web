import { ResData, Restriction, Variation } from '@/shared/api/types'

export interface PostAiImageReqData {
  mainImageId: number
}

export interface PostAiImageResData extends ResData<PostAiImageContent> {}

interface PostAiImageContent {
  variation: Variation
  restriction: Restriction
}
