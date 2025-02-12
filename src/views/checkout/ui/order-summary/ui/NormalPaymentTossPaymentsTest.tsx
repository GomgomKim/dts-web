'use client'

import { dtsAuthAxios } from '@/shared/api'
import { throwIfNotAxiosError } from '@/shared/lib/utils/throwIfNotAxiosError'
import useModals from '@/shared/ui/modal/model/Modals.hooks'

import * as PortOne from '@portone/browser-sdk/v2'
import { isAxiosError } from 'axios'

import { PaymentErrorModal } from './PaymentErrorModal'

type OrderInfo = Pick<
  PortOne.PaymentRequest,
  'orderName' | 'totalAmount' | 'currency' | 'payMethod'
>

export const NormalPaymentTossPaymentsTest = async () => {
  const { handle일반결제: onClick일반결제 } = useHandle일반결제()

  return <button onClick={onClick일반결제}>일반 결제</button>
}

const useHandle일반결제 = () => {
  const { openModal } = useModals()
  const storeId = process.env.NEXT_PUBLIC_STORE_ID
  const channelKey = process.env.NEXT_PUBLIC_CHANNEL_KEY

  const requestPayment = async (orderData: PortOne.PaymentRequest) => {
    try {
      const paymentResponse = await PortOne.requestPayment(orderData)

      if (paymentResponse == null || paymentResponse?.code != null) {
        throw new Error(paymentResponse?.message)
      }

      return paymentResponse
      // ... 결제 후 로직
    } catch (e) {
      alert(e)
    }
  }

  const paymentComplete = async (
    paymentResponse: PortOne.PaymentResponse | undefined,
    orderInfo: OrderInfo
  ) => {
    try {
      const notified = await postPaymentComplete({
        //TODO: adapter
        ...paymentResponse,
        ...orderInfo
      })
      return notified
    } catch (e) {
      // throw new Error(paymentResponse?.message)
      if (isAxiosError(e)) {
        openModal(PaymentErrorModal, { e: e.response!.data })
      } else {
        throwIfNotAxiosError(e)
      }
    }
  }

  const handle일반결제 = async () => {
    if (!storeId || !channelKey) {
      alert('no storeid or channelkey')
      return
    }
    const paymentId = `payment-${crypto.randomUUID()}` // 토스 페이먼츠: 영문 대소문자, 숫자, 특수문자(-,_)만 허용되며, 6자 이상 64자 이하만 가능
    const orderInfo: OrderInfo = {
      orderName: 'n models 테스트',
      totalAmount: 100,
      currency: 'CURRENCY_KRW' as PortOne.Entity.Currency, // 토스페이먼츠의 경우 원화 결제만 지원
      payMethod: 'CARD'
    }

    const orderData = {
      storeId: storeId,
      channelKey: channelKey,
      paymentId,
      ...orderInfo
    }

    // 1. 포트원 브라우저 sdk를 사용하여 결제를 요청합니다.
    const paymentResponse = await requestPayment(orderData)
    // 2. paymentId와 주문 정보를 서버에 전달합니다
    const completeResponse = await paymentComplete(paymentResponse, orderInfo) // 2.

    if (completeResponse) alert('일반 결제 완료')
  }

  return { handle일반결제 }
}

const postPaymentComplete = async (data: {
  orderName: string
  totalAmount: number
  currency: PortOne.Entity.Currency // 토스페이먼츠의 경우 원화 결제만 지원
  // 토스페이먼츠의 경우 원화 결제만 지원
  payMethod: string
  transactionType?: 'PAYMENT' | undefined
  paymentId?: string | undefined
  txId?: string | undefined
  code?: string
  message?: string
  pgCode?: string
  pgMessage?: string
}) => {
  const response = await dtsAuthAxios.post('/payment/complete', {
    data
  })
  return response.data
}

// // 16자리 랜덤 아이디를 생성
// export function randomId() {
//   return Array.from(crypto.getRandomValues(new Uint32Array(2)))
//     .map((word) => word.toString(16).padStart(8, '0'))
//     .join('')
// }
