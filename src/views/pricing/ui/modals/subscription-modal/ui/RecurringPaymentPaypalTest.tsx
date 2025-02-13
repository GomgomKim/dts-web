'use client'

import { useEffect } from 'react'

import { dtsAuthAxios } from '@/shared/api'
import { cn } from '@/shared/lib/utils'

import * as PortOne from '@portone/browser-sdk/v2'
import { useMutation } from '@tanstack/react-query'

export const RecurringPaymentPaypalTest = async () => {
  const postBillingKeyMutation = usePostBillingKey()
  const storeId = process.env.NEXT_PUBLIC_STORE_ID
  const channelKey = process.env.NEXT_PUBLIC_CHANNEL_KEY_PAYPAL_UK

  useEffect(() => {
    ;(async () => {
      if (!storeId || !channelKey) return

      const requestData: PortOne.LoadIssueBillingKeyUIRequest = {
        uiType: 'PAYPAL_RT',
        billingKeyMethod: 'PAYPAL',
        storeId,
        channelKey,
        issueId: `issue-id-${crypto.randomUUID()}`
      }

      await PortOne.loadIssueBillingKeyUI(requestData, {
        onIssueBillingKeySuccess: (response) => {
          alert(JSON.stringify(response))
          // 서버에 빌링키 + 상품정보 보내기 ...
          postBillingKeyMutation.mutate(
            { billingKey: response.billingKey },
            {
              onSuccess: () => {
                alert('paypal 정기 결제 success')
              },
              onError: (e) => {
                alert('paypal 정기 결제 error:' + JSON.stringify(e))
              }
            }
          )
        },
        onIssueBillingKeyFail: (error) => {
          alert('paypal billing key error:' + error)
        }
      })
    })()
  }, [])

  return (
    <div className={cn('portone-ui-container')}>
      {/* <button>페이팔</button> */}
    </div>
  )
}

const usePostBillingKey = () => {
  return useMutation({
    mutationFn: ({ billingKey }: { billingKey: string }) =>
      postBillingKey(billingKey)
  })
}

const postBillingKey = async (billingKey: string) => {
  const response = await dtsAuthAxios.post('/billings', {
    billingKey
    // ...
  })
  return response.data
}
