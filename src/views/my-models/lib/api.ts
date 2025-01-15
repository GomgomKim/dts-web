import { dtsAxios } from '@/shared/api'

import { AxiosError, AxiosResponse } from 'axios'

import { GetArchivesReqData, GetArchivesResData } from './type'

const URL_ARCHIVES = '/v2/contents/archives'

export async function getArchives({
  size = 10,
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
