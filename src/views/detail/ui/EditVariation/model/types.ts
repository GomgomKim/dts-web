import { Properties, ResData, Restriction, Variation } from '@/shared/api/types'

export interface PostAiImageReqData {
  encodedBaseImageId: string
  properties: Properties
}

export interface PostAiImageResData extends ResData<PostAiImageContent> {}

interface PostAiImageContent {
  variation: Variation
  restriction: Restriction
}
