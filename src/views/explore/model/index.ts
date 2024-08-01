export interface GetExploreListReqData {
  tagType: string
  size?: number | null
  scrollKey?: string | null
}

export interface GetExploreListResData {
  code: number
  message: string
  content: Content
}

export interface Content {
  images: Image[]
  hasNext: boolean
  scrollKey: string
}

export interface Image {
  id: number
  name: string
  description: string
  path: string
}
