import { MainItem, ResData } from '@/shared/api/types'

export interface GetArchivesReqData {
  size?: number
  sortingType?: 'NEWEST' | 'OLDEST'
  mediaType?: 'ALL' | 'IMAGE' | 'VIDEO'
  scrollKey?: string
}

interface ArchivesContent {
  data: MainItem[]
  hasNext: boolean
  scrollKey: string | null
}

export interface GetArchivesResData extends ResData<ArchivesContent> {}
