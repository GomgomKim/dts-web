import { useMutation } from '@tanstack/react-query'

import { postBillingKey } from './api'
import { PostPaymentSubscriptionRequest } from './types'

export const usePostBillingKey = () => {
  return useMutation({
    mutationFn: (data: PostPaymentSubscriptionRequest) => postBillingKey(data)
  })
}
