import { dtsAxios } from '@/shared/api'

import { AxiosError, AxiosResponse } from 'axios'

import { URL_CONTENT_BY_MODEL, URL_EXPLORE_LIST } from './constant'
import {
  GetContentByModelReqData,
  GetContentByModelResData,
  GetExploreListReqData,
  GetExploreListResData
} from './types'

const SEAERCH_SIZE = 25

export async function getExploreList({
  tagType,
  size = SEAERCH_SIZE,
  scrollKey
}: GetExploreListReqData): Promise<GetExploreListResData> {
  const response = await dtsAxios.get<
    GetExploreListReqData,
    AxiosResponse<GetExploreListResData, AxiosError>
  >(
    `${URL_EXPLORE_LIST}?filterType=${tagType}&size=${size}` +
      (scrollKey ? `&scrollKey=${scrollKey}` : '')
  )
  console.log('explore list response', response.data)
  return response.data
}

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
