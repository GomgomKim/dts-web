'use client'

import { useEffect } from 'react'

import { cn } from '@/shared/lib/utils'

import * as PortOne from '@portone/browser-sdk/v2'

export const NormalPaymentPaypalTest = async () => {
  const storeId = process.env.NEXT_PUBLIC_STORE_ID
  const channelKey = process.env.NEXT_PUBLIC_CHANNEL_KEY_PAYPAL_UK

  useEffect(() => {
    ;(async () => {
      if (!storeId || !channelKey) return

      const requestData: PortOne.LoadPaymentUIRequest = {
        uiType: 'PAYPAL_SPB',
        storeId,
        channelKey,
        paymentId: `payment-${crypto.randomUUID()}`,
        orderName: '나이키 와플 트레이너 2 SD',
        totalAmount: 1000, // $10.00
        currency: 'CURRENCY_USD'
      }

      await PortOne.loadPaymentUI(
        {
          ...requestData,
          bypass: {
            paypal_v2: {
              style: {
                layout: 'horizontal',
                color: 'silver',
                shape: 'pill',
                label: 'pay'
              }
            }
          }
        },
        {
          onPaymentSuccess: (response) => {
            alert(JSON.stringify(response))
            // 서버에 paymentId 전송
            return response
          },
          onPaymentFail: (error) => {
            alert(error)
          }
        }
      )
    })()
  }, [])

  return <div className={cn('portone-ui-container')}></div>
}
