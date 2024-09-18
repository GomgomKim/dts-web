import { AxiosError, AxiosResponse, isAxiosError } from 'axios'
import { dtsAxios } from '@/shared/api'
import {
  GetAiImageProgressReqData,
  GetAiImageProgressResData,
  GetVariationListReqData,
  GetVariationListResData,
  PostAiImageReqData,
  PostAiImageResData,
  PostRemoveBackgroundReqData
} from './types'
import {
  URL_AI_IMAGE_GENERATE,
  URL_AI_IMAGE_GENERATE_PROGRESS,
  URL_ASSET_REMOVE_BACKGROUND,
  URL_VARIATION_LIST
} from './constant'

export async function getVariationList({
  encodedBaseImageInfoId
}: GetVariationListReqData): Promise<GetVariationListResData> {
  const response = await dtsAxios.get<
    GetVariationListReqData,
    AxiosResponse<GetVariationListResData, AxiosError>
  >(`${URL_VARIATION_LIST}?encodedImageInfoId=${encodedBaseImageInfoId}`)
  return response.data
}

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

export async function getAiImageProgress({
  encodedImageId
}: GetAiImageProgressReqData) {
  try {
    const response = await dtsAxios.get<
      GetAiImageProgressReqData,
      AxiosResponse<GetAiImageProgressResData, AxiosError>
    >(`${URL_AI_IMAGE_GENERATE_PROGRESS}?encodedImageId=${encodedImageId}`)

    return response.data
  } catch (error) {
    if (isAxiosError(error)) {
      return new AxiosError(error.response?.data)
    } else {
      console.log('unexpected error', error)
    }
  }
}

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
