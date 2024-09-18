import { AxiosError, AxiosResponse } from 'axios'
import { dtsAxios } from '@/shared/api'
import {
  GetExploreListResData,
  GetExploreListReqData
} from '@/features/explore/CardList/types'
import { URL_EXPLORE_LIST } from '@/features/explore/CardList/constant'

const SEAERCH_SIZE = 10

export async function getExploreImages({
  filterType,
  size = SEAERCH_SIZE,
  scrollKey
}: GetExploreListReqData): Promise<GetExploreListResData> {
  const response = await dtsAxios.get<
    GetExploreListReqData,
    AxiosResponse<GetExploreListResData, AxiosError>
  >(
    `${URL_EXPLORE_LIST}?filterType=${filterType}&size=${size}` +
      (scrollKey ? `&scrollKey=${scrollKey}` : '')
  )
  return response.data
}
