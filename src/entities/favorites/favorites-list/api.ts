import { AxiosError, AxiosResponse } from 'axios'
import { dtsAxios } from '@/shared/api'
import { GetFavoriteListReqData, GetFavoriteListResData } from './model'
import { URL_FAVORITE_LIST } from './constant'

const SEAERCH_SIZE = 10

export async function getFavoriteList({
  tagType,
  size = SEAERCH_SIZE,
  scrollKey
}: GetFavoriteListReqData): Promise<GetFavoriteListResData> {
  const response = await dtsAxios.get<
    GetFavoriteListReqData,
    AxiosResponse<GetFavoriteListResData, AxiosError>
  >(
    `${URL_FAVORITE_LIST}?tagType=${tagType}&size=${size}` +
      (scrollKey ? `&scrollKey=${scrollKey}` : '')
  )
  return response.data
}
