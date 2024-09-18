import { AxiosError, AxiosResponse } from 'axios'
import { dtsAxios } from '@/shared/api'
import { URL_FAVORITE_ADD, URL_FAVORITE_REMOVE } from './constant'
import { DeleteFavoriteReqData, PostFavoriteReqData } from './types'

// TODO: error 처리
export async function postFavorite({
  encodedImageInfoId
}: PostFavoriteReqData): Promise<void> {
  const response = await dtsAxios.post<
    PostFavoriteReqData,
    AxiosResponse<void, AxiosError>
  >(`${URL_FAVORITE_ADD}?encodedImageInfoId=${encodedImageInfoId}`)
  return response.data
}

export async function deleteFavorite({
  encodedImageInfoId
}: DeleteFavoriteReqData): Promise<void> {
  const response = await dtsAxios.delete<null, AxiosResponse<void, AxiosError>>(
    `${URL_FAVORITE_REMOVE}?encodedImageInfoId=${encodedImageInfoId}`
  )
  return response.data
}
