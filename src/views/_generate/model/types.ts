import { Restriction } from '@/shared/api/types'
import { ResData } from '@/shared/api/types'

export interface GetContentByModelReqData {
  modelId?: number | null
}

interface ContentByModelContent {
  images: []
  videos: []
  restriction: Restriction
  tags: string[]
}

export interface GetContentByModelResData
  extends ResData<ContentByModelContent> {}
