import { AxiosError, AxiosResponse } from 'axios'
import { dtsAxios } from '@/shared/api'
import {
  GetExploreListResData,
  GetExploreListReqData
} from '@/views/explore/model'
import { URL_EXPLORE_LIST } from '@/views/explore/api/constants'

const SEAERCH_SIZE = 4

export async function getExploreImages({
  tagType,
  size = SEAERCH_SIZE,
  scrollKey
}: GetExploreListReqData): Promise<GetExploreListResData> {
  const response = await dtsAxios.get<
    GetExploreListReqData,
    AxiosResponse<GetExploreListResData, AxiosError>
  >(
    `${URL_EXPLORE_LIST}?tagType=${tagType}` +
      (size ? `&size=${size}` : '') +
      (scrollKey ? `&scrollKey=${scrollKey}` : '')
  )
  return response.data
}
