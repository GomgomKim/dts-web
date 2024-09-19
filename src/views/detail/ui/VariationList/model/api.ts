import { dtsAxios } from '@/shared/api'
import {
  URL_AI_IMAGE_GENERATE_PROGRESS,
  URL_VARIATION_LIST
} from '@/entities/detail/constant'
import {
  GetAiImageProgressReqData,
  GetAiImageProgressResData,
  GetVariationListReqData,
  GetVariationListResData
} from './types'
import { AxiosError, AxiosResponse, isAxiosError } from 'axios'

export async function getVariationList({
  encodedBaseImageInfoId
}: GetVariationListReqData): Promise<GetVariationListResData> {
  const response = await dtsAxios.get<
    GetVariationListReqData,
    AxiosResponse<GetVariationListResData, AxiosError>
  >(`${URL_VARIATION_LIST}?encodedImageInfoId=${encodedBaseImageInfoId}`)
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
