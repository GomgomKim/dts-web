import { ResData, Restriction, ScrollContent } from '@/shared/api/types'

export interface GetExploreListReqData {
  tagType?: string | null
  size?: number | null
  scrollKey?: string | null
}

export interface GetExploreListResData extends ResData<ExploreListContent> {}

export interface ExploreListContent extends ScrollContent {}

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
