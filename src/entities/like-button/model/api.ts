import { dtsAxios } from '@/shared/api'

import { AxiosError, AxiosResponse } from 'axios'

import { URL_FAVORITE_ADD, URL_FAVORITE_REMOVE } from './constant'
import { DeleteFavoriteReqData, PostFavoriteReqData } from './types'

// TODO: error 처리
export async function postFavorite({
  mainImageId
}: PostFavoriteReqData): Promise<void> {
  const response = await dtsAxios.post<
    PostFavoriteReqData,
    AxiosResponse<void, AxiosError>
  >(`${URL_FAVORITE_ADD}?mainImageId=${mainImageId}`)
  return response.data
}

export async function deleteFavorite({
  mainImageId
}: DeleteFavoriteReqData): Promise<void> {
  const response = await dtsAxios.delete<null, AxiosResponse<void, AxiosError>>(
    `${URL_FAVORITE_REMOVE}?mainImageId=${mainImageId}`
  )
  return response.data
}
