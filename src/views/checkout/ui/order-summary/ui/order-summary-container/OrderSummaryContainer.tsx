'use client'

import { ReactNode } from 'react'

import { useCurrencyStore } from '@/views/pricing/model/useCurrencyStore'

import { ErrorBoundary } from '@/shared/ui/error-boundary'

import { OrderLabeledDetail } from '../OrderLabeledDetail'
import { UI_TEXT } from './model/constants'
import './style.css'
import {
  PayNowPaypalButton,
  PayNowTossPaymentsButton,
  PaymentErrorModal
} from './ui'

interface OrderSummaryContainerProps {
  children: ReactNode
  discount: number
  subtotal: number
}

export const OrderSummaryContainer = (props: OrderSummaryContainerProps) => {
  const currency = useCurrencyStore((state) => state.currency)
  const currencySign = useCurrencyStore((state) => state.getCurrencySign())

  return (
    <div className="m-auto w-[560px] divide-y rounded-[0.5rem] border border-neutral-2 p-10">
      <h2 className="mb-8 text-[1.5rem] font-semibold">
        {UI_TEXT.ORDER_SUMMARY}
      </h2>

      {props.children}

      <div className="divide-y pb-6 pt-8">
        <div className="space-y-3 pb-6">
          <OrderLabeledDetail
            label={UI_TEXT.DISCOUNT}
            detail={props.discount ? `-${currencySign}${props.discount}` : '-'}
          />
          <OrderLabeledDetail
            label={UI_TEXT.SUBTOTAL}
            detail={`${currencySign}${props.subtotal}`}
          />
        </div>
        <div className="pt-6">
          <OrderLabeledDetail
            label={
              <>
                <span className="text-[1.125rem] font-bold">
                  {UI_TEXT.AMOUNT_PAID}
                </span>{' '}
                <span className="text-[1.125rem] text-neutral-5">
                  ({UI_TEXT.TAXES_INCLUDED})
                </span>
              </>
            }
            detail={
              <span className="text-[1.125rem] font-bold">
                {currencySign}
                {props.subtotal}
              </span>
            }
          />
        </div>
      </div>
      <div className="h-[48px] rounded-full border-none bg-neutral-1">
        <ErrorBoundary
          FallbackComponent={({ error }) => <PaymentErrorModal e={error} />}
        >
          {currency === 'USD' ? (
            <PayNowPaypalButton />
          ) : (
            <PayNowTossPaymentsButton />
          )}
        </ErrorBoundary>
      </div>
    </div>
  )
}
