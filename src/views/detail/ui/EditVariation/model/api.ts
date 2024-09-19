import { dtsAxios } from '@/shared/api'
import { URL_AI_IMAGE_GENERATE } from '@/entities/detail/constant'
import { PostAiImageReqData, PostAiImageResData } from './types'
import { AxiosError, AxiosResponse } from 'axios'

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
