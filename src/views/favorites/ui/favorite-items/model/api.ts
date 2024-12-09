import { dtsAxios } from '@/shared/api'

import { AxiosError, AxiosResponse } from 'axios'

import { URL_FAVORITE_LIST } from './constant'
import { GetFavoriteListReqData, GetFavoriteListResData } from './types'

const SEAERCH_SIZE = 10

export async function getFavoriteList({
  size = SEAERCH_SIZE,
  order,
  scrollKey
}: GetFavoriteListReqData): Promise<GetFavoriteListResData> {
  const response = await dtsAxios.get<
    GetFavoriteListReqData,
    AxiosResponse<GetFavoriteListResData, AxiosError>
  >(
    `${URL_FAVORITE_LIST}?size=${size}&sortingType=${order}` +
      (scrollKey ? `&scrollKey=${scrollKey}` : '')
  )
  return response.data
}
