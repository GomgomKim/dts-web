import { Content } from '@/features/explore/CardList/model'

export interface GetFavoriteListReqData {
  tagType: string
  size?: number | null
  scrollKey?: string | null
}

export interface GetFavoriteListResData {
  code: number
  message: string
  content: Content
}
