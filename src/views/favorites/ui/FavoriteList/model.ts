import { ResData, ScrollContent } from '@/shared/api/types'

export interface GetFavoriteListReqData {
  filterType: string
  sortingType?: string | null
  size?: number | null
  scrollKey?: string | null
}

export interface GetFavoriteListResData extends ResData<FavoriteListContent> {}

export interface FavoriteListContent extends ScrollContent {}
