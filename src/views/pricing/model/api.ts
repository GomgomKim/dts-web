import { dtsAxios } from '@/shared/api'

import { AxiosError, AxiosResponse } from 'axios'

import { URL_PAYMENT_MEMBERSHIP } from './constants'
import { GetMembershipResponse } from './types'

export const getMembership = async () => {
  const response = await dtsAxios.get<
    GetMembershipResponse,
    AxiosResponse<GetMembershipResponse, AxiosError>
  >(URL_PAYMENT_MEMBERSHIP)
  return response.data
}
