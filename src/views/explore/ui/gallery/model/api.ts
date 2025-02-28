import { dtsAxios } from '@/shared/api'

import { AxiosError, AxiosResponse } from 'axios'

import { URL_EXPLORE_LIST } from './constant'
import { GetExploreListReqData, GetExploreListResData } from './types'

const SEAERCH_SIZE = 25

export async function getExploreList({
  tagType,
  size = SEAERCH_SIZE,
  offset
}: GetExploreListReqData): Promise<GetExploreListResData> {
  const response = await dtsAxios.get<
    GetExploreListReqData,
    AxiosResponse<GetExploreListResData, AxiosError>
  >(
    `${URL_EXPLORE_LIST}?tagType=${tagType}&size=${size}` +
      (offset ? `&offset=${offset}` : '')
  )
  return response.data
}
