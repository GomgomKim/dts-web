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
  images: ModelImageItem[]
  hasNext: boolean
  scrollKey: string
}

export interface ModelImageItem {
  encodedBaseImageId: string
  name: string
  description: string
}
