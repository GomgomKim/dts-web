import { dtsAuthAxios } from '@/shared/api'

import { AxiosError, AxiosResponse } from 'axios'

import { URL_PAYMENT_MEMBERSHIP } from './constants'
import { GetMembershipResonse } from './types'

export const getMembership = async () => {
  const response = await dtsAuthAxios.get<
    GetMembershipResonse,
    AxiosResponse<GetMembershipResonse, AxiosError>
  >(URL_PAYMENT_MEMBERSHIP)
  return response.data
}
