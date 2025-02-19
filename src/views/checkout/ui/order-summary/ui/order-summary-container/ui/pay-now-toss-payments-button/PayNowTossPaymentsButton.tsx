'use client'

import { useRouter, useSearchParams } from 'next/navigation'

import { MY_ACCOUNT_TABS } from '@/views/my-account/model'

import { throwIfNotAxiosError } from '@/shared/lib/utils/throwIfNotAxiosError'
import { Button } from '@/shared/ui'
import useModals from '@/shared/ui/modal/model/Modals.hooks'

import { isAxiosError } from 'axios'

import { PaymentErrorModal } from '../../../PaymentErrorModal'
import { usePostBillingKey } from './model/adapter'
import { getBillingKey } from './model/api'
import { UI_TEXT } from './model/constants'
import { PostPaymentSubscriptionRequest } from './model/types'

export const PayNowTossPaymentsButton = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { openModal } = useModals()
  const postBillingKeyMutation = usePostBillingKey()

  const planId = searchParams.get('planId')
  const creditId = searchParams.get('creditId')

  const isDisabled = !planId && !creditId

  const handleClickPayNow = async (planId: number) => {
    // 1. 결제창을 통해 빌링키를 발급받습니다.
    const issueResponse = await getBillingKey()
    if (!issueResponse?.billingKey) {
      return
      // throw new Error('billing key is undefined')
    }

    const postPaymentSubscriptionData: PostPaymentSubscriptionRequest = {
      planId,
      billingKey: issueResponse.billingKey
    }

    // 2. 고객사 서버에 빌링키를 전달합니다
    // TODO: postBillingKeyMutation.isPending 상태 활용
    postBillingKeyMutation.mutate(postPaymentSubscriptionData, {
      onSuccess: () => {
        // TODO:
        alert('정기 결제 성공')
        router.replace(`/my-account?tab=${MY_ACCOUNT_TABS.subscriptions}`)
      },
      onError: (e) => {
        if (isAxiosError(e)) {
          openModal(PaymentErrorModal, { e: e.response!.data })
        } else {
          throwIfNotAxiosError(e)
        }
      }
    })
  }

  if (isDisabled) return null
  return (
    <Button
      stretch
      type="button"
      className="bg-white hover:bg-white"
      disabled={isDisabled}
      onClick={() => handleClickPayNow(parseInt(planId!))}
    >
      {UI_TEXT.PAY_NOW}
    </Button>
  )
}
