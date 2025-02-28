import { ResData } from '@/shared/api/types'

export interface GetArchivesReqData {
  size?: number
  sortingType?: 'NEWEST' | 'OLDEST'
  offset?: string
}

// TODO: shared로 옮기기
export interface ArchiveItem {
  createdDate: string
  contents: Content[] // 최종 날짜별 아이템들
}

export interface Content {
  contentsId: number
  modelId: number
  encryptedContentsPath: string
}

// TODO: shared 적용
interface ScrollContent {
  data: ArchiveItem[]
  hasNext: boolean
  offset: string | null
}

export interface GetArchivesResData extends ResData<ScrollContent> {}
