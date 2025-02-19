import { URL_PAYMENT_SUBSCRIPTION } from '@/views/checkout/model/constants'

import { dtsAxios } from '@/shared/api'
import { throwIfNotAxiosError } from '@/shared/lib/utils/throwIfNotAxiosError'

import { AxiosError } from 'axios'

import { PutSubscriptionResponse } from './types'

export const putSubscription = async (planId: number) => {
  try {
    const response = await dtsAxios.put<
      PutSubscriptionResponse,
      AxiosError<PutSubscriptionResponse, Error>
    >(URL_PAYMENT_SUBSCRIPTION, {
      planId
    })
    return response
  } catch (e) {
    if (e instanceof AxiosError) {
      throw new Error(e.message)
    }
    throwIfNotAxiosError(e)
  }
}
