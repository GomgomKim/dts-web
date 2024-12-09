import { ResData, ScrollContent } from '@/shared/api/types'

export interface GetExploreListReqData {
  tagType?: string | null
  size?: number | null
  scrollKey?: string | null
}

export interface GetExploreListResData extends ResData<ExploreListContent> {}

export interface ExploreListContent extends ScrollContent {}
