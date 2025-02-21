import { dtsAxios } from '@/shared/api'

import * as PortOne from '@portone/browser-sdk/v2'
import { AxiosError, AxiosResponse } from 'axios'

import { URL_PAYMENT_SUBSCRIPTION } from './constants'
import {
  PostPaymentSubscriptionRequest,
  PostPaymentSubscriptionResponse
} from './types'

export const getBillingKey = async () => {
  const storeId = process.env.NEXT_PUBLIC_STORE_ID
  const channelKey = process.env.NEXT_PUBLIC_CHANNEL_KEY

  if (!storeId || !channelKey) {
    alert('no store id or channelkey')
  }

  try {
    const issueResponse = await PortOne.requestIssueBillingKey({
      storeId: storeId!,
      channelKey: channelKey!,
      billingKeyMethod: 'CARD' as PortOne.Entity.BillingKeyMethod
    })

    if (issueResponse?.code !== undefined) {
      throw new Error(issueResponse.message)
    }

    return issueResponse
  } catch (e) {
    // TODO: error 처리
    alert(e)
  }
}

export const postBillingKey = async (data: PostPaymentSubscriptionRequest) => {
  const response = await dtsAxios.post<
    PostPaymentSubscriptionRequest,
    AxiosResponse<PostPaymentSubscriptionResponse, AxiosError>
  >(URL_PAYMENT_SUBSCRIPTION, {
    ...data
  })
  return response.data
}
