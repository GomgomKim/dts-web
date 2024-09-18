import { ResData, ScrollContent } from '@/shared/api/types'

export interface GetExploreListReqData {
  filterType: string
  size?: number | null
  scrollKey?: string | null
}

export interface GetExploreListResData extends ResData<ExploreListContent> {}

export interface ExploreListContent extends ScrollContent {}
