import { dtsAxios } from '@/shared/api'
import { AxiosError, AxiosResponse } from 'axios'

import { PostRemoveBackgroundReqData } from './types'
import { URL_ASSET_REMOVE_BACKGROUND } from '@/entities/detail/constant'

export async function postRemoveBackground({
  source
}: {
  source: FormData
}): Promise<Blob> {
  const response = await dtsAxios.post<
    PostRemoveBackgroundReqData,
    AxiosResponse<Blob, AxiosError>
  >(`${URL_ASSET_REMOVE_BACKGROUND}`, source, {
    responseType: 'blob',
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
  return response.data
}
