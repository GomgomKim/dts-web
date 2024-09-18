import { AxiosError, AxiosResponse } from 'axios'
import { dtsAxios } from '@/shared/api'
import { GetExploreListReqData, GetExploreListResData } from './types'
import { URL_EXPLORE_LIST } from '../constant'

const SEAERCH_SIZE = 10

export async function getExploreList({
  filterType,
  size = SEAERCH_SIZE,
  scrollKey
}: GetExploreListReqData): Promise<GetExploreListResData> {
  const response = await dtsAxios.get<
    GetExploreListReqData,
    AxiosResponse<GetExploreListResData, AxiosError>
  >(
    `${URL_EXPLORE_LIST}?filterType=${filterType}&size=${size}` +
      (scrollKey ? `&scrollKey=${scrollKey}` : '')
  )
  return response.data
}
