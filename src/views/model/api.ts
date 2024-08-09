import { AxiosError, AxiosResponse } from 'axios'
import { dtsAxios } from '@/shared/api'
import { GetVariationListReqData, GetVariationListResData } from './model'
import { URL_VARIATION_LIST } from './constant'

export async function getVariationImages({
  encodedBaseImageId
}: GetVariationListReqData): Promise<GetVariationListResData> {
  const response = await dtsAxios.get<
    GetVariationListReqData,
    AxiosResponse<GetVariationListResData, AxiosError>
  >(`${URL_VARIATION_LIST}/${encodedBaseImageId}`)
  return response.data
}
