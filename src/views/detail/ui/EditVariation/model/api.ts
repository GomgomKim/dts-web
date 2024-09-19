import { URL_AI_IMAGE_GENERATE } from '@/entities/detail/constant'

import { dtsAxios } from '@/shared/api'

import { AxiosError, AxiosResponse } from 'axios'

import { PostAiImageReqData, PostAiImageResData } from './types'

export async function postAiImageGenerate({
  encodedBaseImageId,
  properties
}: PostAiImageReqData): Promise<PostAiImageResData> {
  const response = await dtsAxios.post<
    PostAiImageReqData,
    AxiosResponse<PostAiImageResData, AxiosError>
  >(`${URL_AI_IMAGE_GENERATE}`, {
    encodedBaseImageId,
    properties
  })
  return response.data
}
