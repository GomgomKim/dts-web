import { URL_PAYMENT_SUBSCRIPTION } from '@/views/checkout/model/constants'

import { dtsAxios } from '@/shared/api'

import { AxiosResponse } from 'axios'

import { DeleteSubscriptionResponse } from './types'

export const deleteSubscription = async () => {
  const response = await dtsAxios.delete<
    DeleteSubscriptionResponse,
    AxiosResponse<DeleteSubscriptionResponse, Error>
  >(URL_PAYMENT_SUBSCRIPTION)
  return response.data
}
