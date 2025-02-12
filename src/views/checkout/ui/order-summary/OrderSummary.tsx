'use client'

import { useSearchParams } from 'next/navigation'

import { useCurrencyStore } from '@/views/pricing/model/useCurrencyStore'
import { PLAN_ITEMS } from '@/views/pricing/ui/plan-Items/model/constant'
import { PLAN_NAME_TITLE_MAP } from '@/views/pricing/ui/plan-Items/model/types'

import { Button } from '@/shared/ui'

import { UI_TEXT } from '../../model/constants'
import { OrderLabeledDetail } from './ui'
import { PeriodOfUse } from './ui/PeriodOfUse'

export const OrderSummary = () => {
  const searchParams = useSearchParams()
  const currency = useCurrencyStore((state) => state.currency)
  const currencySign = useCurrencyStore((state) => state.getCurrencySign())

  const planId = searchParams.get('planId')

  if (!planId) return null

  const selectedPlan = PLAN_ITEMS[currency].find(
    (item) => item.id === parseInt(planId)
  )

  if (!selectedPlan) return null

  const discount = 0
  const subtotal = selectedPlan.price - discount

  return (
    <div className="m-auto w-[560px] divide-y rounded-[0.5rem] border border-neutral-2 p-10">
      <h2 className="mb-8 text-[1.5rem] font-semibold">
        {UI_TEXT.ORDER_SUMMARY}
      </h2>
      <div className="space-y-3 py-6">
        <OrderLabeledDetail
          label={UI_TEXT.PLAN}
          detail={`${PLAN_NAME_TITLE_MAP[selectedPlan?.name]} ${UI_TEXT.PLAN_DESCRIPTION_1} ${selectedPlan?.creditNum} ${UI_TEXT.PLAN_DESCRIPTION_2}`}
        />
        <OrderLabeledDetail
          label={UI_TEXT.BILLING_CYCLE}
          detail={
            <>
              <div className="mb-1 text-right text-[1.125rem] font-normal text-white">
                {UI_TEXT.MONTHLY}
              </div>
              <div className="text-right text-[1rem] text-neutral-5">
                <PeriodOfUse />
              </div>
            </>
          }
        />
      </div>
      <div className="py-8">
        <OrderLabeledDetail
          label={UI_TEXT.PRICE}
          detail={`${currencySign}${selectedPlan?.price}`}
        />
      </div>
      <div className="divide-y pb-6 pt-8">
        <div className="space-y-3 pb-6">
          <OrderLabeledDetail
            label={UI_TEXT.DISCOUNT}
            detail={discount ? `-${currencySign}${discount}` : '-'}
          />
          <OrderLabeledDetail
            label={UI_TEXT.SUBTOTAL}
            detail={`${currencySign}${subtotal}`}
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
                {subtotal}
              </span>
            }
          />
        </div>
      </div>
      <div className="border-none">
        {/* usd이면 페이팔 버튼 렌더링 */}
        <Button stretch type="button" className="bg-white hover:bg-white">
          {UI_TEXT.PAY_NOW}
        </Button>
      </div>
    </div>
  )
}
