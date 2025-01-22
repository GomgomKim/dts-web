import { dtsAxios } from '@/shared/api'

import { AxiosError, AxiosResponse } from 'axios'

import { URL_CONTENT_BY_MODEL } from './constants'
import { GetContentByModelReqData, GetContentByModelResData } from './types'

export async function getContentByModel({
  modelId
}: GetContentByModelReqData): Promise<GetContentByModelResData> {
  const response = await dtsAxios.get<
    GetContentByModelReqData,
    AxiosResponse<GetContentByModelResData, AxiosError>
  >(`${URL_CONTENT_BY_MODEL}?modelId=${modelId}`)
  console.log('by model response', response.data)
  return response.data
}
