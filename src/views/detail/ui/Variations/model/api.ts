import {
  URL_AI_IMAGE_GENERATE_PROGRESS,
  URL_VARIATION_LIST
} from '@/entities/detail/constant'

import { dtsAxios } from '@/shared/api'

import { AxiosError, AxiosResponse, isAxiosError } from 'axios'

import {
  GetAiImageProgressReqData,
  GetAiImageProgressResData,
  GetVariationListReqData,
  GetVariationListResData
} from './types'

export async function getVariationList({
  mainImageId
}: GetVariationListReqData): Promise<GetVariationListResData> {
  const response = await dtsAxios.get<
    GetVariationListReqData,
    AxiosResponse<GetVariationListResData, AxiosError>
  >(`${URL_VARIATION_LIST}?mainImageId=${mainImageId}`)
  // await new Promise((resolve) => setTimeout(resolve, 5000))
  return response.data
}

export async function getAiImageProgress({
  variationImageId
}: GetAiImageProgressReqData) {
  try {
    const response = await dtsAxios.get<
      GetAiImageProgressReqData,
      AxiosResponse<GetAiImageProgressResData, AxiosError>
    >(`${URL_AI_IMAGE_GENERATE_PROGRESS}?variationImageId=${variationImageId}`)

    return response.data
  } catch (error) {
    if (isAxiosError(error)) {
      return new AxiosError(error.response?.data)
    } else {
      console.log('unexpected error', error)
    }
  }
}
