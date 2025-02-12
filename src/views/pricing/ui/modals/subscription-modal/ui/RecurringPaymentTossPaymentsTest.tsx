'use client'

import { dtsAuthAxios } from '@/shared/api'
import { throwIfNotAxiosError } from '@/shared/lib/utils/throwIfNotAxiosError'
import useModals from '@/shared/ui/modal/model/Modals.hooks'

import * as PortOne from '@portone/browser-sdk/v2'
import { useMutation } from '@tanstack/react-query'
import { isAxiosError } from 'axios'

import { PaymentErrorModal } from './PaymentErrorModal'

export const RecurringPaymentTossPaymentsTest = async () => {
  const { handle정기결제: onClick정기결제 } = useHandle정기결제()
  return <button onClick={onClick정기결제}>정기 결제(빌링키 발급)</button>
}

const useHandle정기결제 = () => {
  const { openModal } = useModals()
  const postBillingKeyMutation = usePostBillingKey()

  const getBillingKey = async () => {
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

      // 빌링키가 제대로 발급되지 않은 경우 에러 코드가 존재합니다
      if (issueResponse?.code !== undefined) {
        throw new Error(issueResponse.message)
      }

      return issueResponse
    } catch (e) {
      alert(e)
    }
  }

  const handle정기결제 = async () => {
    // 1. 결제창을 통해 빌링키를 발급받습니다.
    const issueResponse = await getBillingKey()
    if (!issueResponse?.billingKey) {
      //   alert('billing key is undefined' + issueResponse)
      return
    }

    // 2. 고객사 서버에 빌링키를 전달합니다
    postBillingKeyMutation.mutate(
      { billingKey: issueResponse.billingKey },
      {
        onSuccess: () => {
          alert('정기 결제 성공')
        },
        onError: (e) => {
          if (isAxiosError(e)) {
            openModal(PaymentErrorModal, { e: e.response!.data })
          } else {
            throwIfNotAxiosError(e)
          }
        }
      }
    )
  }

  return { handle정기결제 }
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
