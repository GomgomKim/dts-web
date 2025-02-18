'use client'

import { useEffect } from 'react'

import { useSearchParams } from 'next/navigation'

import { dtsAxios } from '@/shared/api'
import { cn } from '@/shared/lib/utils'
import { throwIfNotAxiosError } from '@/shared/lib/utils/throwIfNotAxiosError'
import useModals from '@/shared/ui/modal/model/Modals.hooks'

import * as PortOne from '@portone/browser-sdk/v2'
import { useMutation } from '@tanstack/react-query'
import { isAxiosError } from 'axios'

import { PaymentErrorModal } from '../PaymentErrorModal'

export const PayNowPaypalButton = () => {
  const searchParams = useSearchParams()
  const postBillingKeyMutation = usePostBillingKey()
  const storeId = process.env.NEXT_PUBLIC_STORE_ID
  const channelKey = process.env.NEXT_PUBLIC_CHANNEL_KEY_PAYPAL

  const { openModal } = useModals()

  const planId = searchParams.get('planId')
  const creditId = searchParams.get('creditId')

  const isDisabled = !planId && !creditId

  useEffect(() => {
    const initializePaypal = async () => {
      if (isDisabled) return

      if (!storeId || !channelKey) {
        throw new Error('No store id or channel key')
      }

      const requestData: PortOne.LoadIssueBillingKeyUIRequest = {
        uiType: 'PAYPAL_RT',
        billingKeyMethod: 'PAYPAL',
        storeId,
        channelKey,
        issueId: `issue-id-${crypto.randomUUID()}`,
        bypass: {
          paypal_v2: {
            style: {
              height: 48,
              color: 'silver',
              label: 'pay',
              shape: 'pill'
            }
          }
        }
      }

      try {
        await PortOne.loadIssueBillingKeyUI(requestData, {
          onIssueBillingKeySuccess: async (response) => {
            try {
              const res = await postBillingKeyMutation.mutateAsync({
                billingKey: response.billingKey
              })
              console.log('paypal 정기 결제 success', res)
              return res
            } catch (error) {
              handleError(error)
            }
          },
          onIssueBillingKeyFail: (error) => {
            throw new Error(`Paypal billing key error: ${error}`)
          }
        })
      } catch (error) {
        handleError(error)
      }
    }

    initializePaypal().catch(handleError)
  }, [])

  const handleError = (error: unknown) => {
    if (isAxiosError(error)) {
      openModal(PaymentErrorModal, {
        e: error.response?.data.message || 'An error occurred'
      })
    } else if (error instanceof Error) {
      throw openModal(PaymentErrorModal, { e: error })
    } else {
      throwIfNotAxiosError(error)
    }
  }

  return (
    <>
      {/* eslint-disable-next-line tailwindcss/no-custom-classname */}
      <div className={cn('portone-ui-container')}>
        {/* <button>페이팔</button> */}
      </div>
    </>
  )
}

const usePostBillingKey = () => {
  return useMutation({
    mutationFn: ({ billingKey }: { billingKey: string }) =>
      postBillingKey(billingKey)
  })
}

//  TODO: plan, credit id 연결!!!!!!!!
const postBillingKey = async (billingKey: string) => {
  const response = await dtsAxios.post('/payment/subscription', {
    planId: 10,
    billingKey
  })
  return response.data
}
