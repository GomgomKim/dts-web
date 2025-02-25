import { ResData, ScrollContent } from '@/shared/api/types'

export interface GetExploreListReqData {
  tagType?: string | null
  size?: number | null
  offset?: string | null
}

export interface GetExploreListResData extends ResData<ExploreListContent> {}

export interface ExploreListContent extends ScrollContent {}
