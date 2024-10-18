import { URL_AI_IMAGE_GENERATE } from '@/entities/generate/constant'

import { dtsAxios } from '@/shared/api'

import { AxiosError, AxiosResponse } from 'axios'

import { PostAiImageReqData, PostAiImageResData } from './types'

export async function postAiImageGenerate({
  mainImageId
}: PostAiImageReqData): Promise<PostAiImageResData> {
  const response = await dtsAxios.post<
    PostAiImageReqData,
    AxiosResponse<PostAiImageResData, AxiosError>
  >(`${URL_AI_IMAGE_GENERATE}?mainImageId=${mainImageId}`)
  return response.data
}
