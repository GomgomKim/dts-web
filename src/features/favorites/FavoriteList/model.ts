import { Content } from '@/features/explore/CardList/model'

// TODO: type 수정
export interface GetFavoriteListReqData {
  filterType: string
  sortingType?: string | null
  size?: number | null
  scrollKey?: string | null
}

export interface GetFavoriteListResData {
  code: number
  message: string
  content: Content
}
