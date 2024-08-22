import { AxiosError, AxiosResponse } from 'axios'
import { dtsAxios } from '@/shared/api'
import { URL_FAVORITE_ADD, URL_FAVORITE_REMOVE } from './constant'
import { PostFavoriteAddReqData, DeleteFavoriteRemoveReqData } from './model'

// TODO: error 처리
export async function postFavoriteAdd({
  encodedBaseImageId
}: PostFavoriteAddReqData): Promise<void> {
  const response = await dtsAxios.post<
    PostFavoriteAddReqData,
    AxiosResponse<void, AxiosError>
  >(`${URL_FAVORITE_ADD}?encodedBaseImageId=${encodedBaseImageId}`)
  return response.data
}

export async function deleteFavoriteRemove({
  encodedBaseImageId
}: DeleteFavoriteRemoveReqData): Promise<void> {
  const response = await dtsAxios.delete<null, AxiosResponse<void, AxiosError>>(
    `${URL_FAVORITE_REMOVE}?encodedBaseImageId=${encodedBaseImageId}`
  )
  return response.data
}
