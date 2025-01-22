import { dtsAxios } from '@/shared/api'

import { AxiosError, AxiosResponse } from 'axios'

import { DEFAULT_PAGE_SIZE, URL_ARCHIVES } from './constants'
import { GetArchivesReqData, GetArchivesResData } from './type'

export async function getArchives({
  size = DEFAULT_PAGE_SIZE,
  sortingType = 'NEWEST',
  mediaType = 'ALL',
  scrollKey
}: GetArchivesReqData = {}): Promise<GetArchivesResData> {
  const response = await dtsAxios.get<
    GetArchivesReqData,
    AxiosResponse<GetArchivesResData, AxiosError>
  >(
    `${URL_ARCHIVES}?size=${size}&sortingType=${sortingType}&mediaType=${mediaType}` +
      (scrollKey ? `&scrollKey=${scrollKey}` : '')
  )
  return response.data
}
