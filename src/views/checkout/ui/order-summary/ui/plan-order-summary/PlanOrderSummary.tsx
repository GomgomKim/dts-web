import { useSearchParams } from 'next/navigation'

import { useCurrencyStore } from '@/views/pricing/model/useCurrencyStore'
import { PLAN_ITEMS } from '@/views/pricing/ui/plan-Items/model/constant'
import { PLAN_NAME_TITLE_MAP } from '@/views/pricing/ui/plan-Items/model/types'

import { UI_TEXT } from '../../../../model/constants'
import { OrderLabeledDetail } from '../OrderLabeledDetail'
import { OrderSummaryContainer } from '../order-summary-container'
import { PeriodOfUse } from '../period-of-use'

export const PlanOrderSummary = () => {
  const searchParams = useSearchParams()
  const currency = useCurrencyStore((state) => state.currency)
  const currencySign = useCurrencyStore((state) => state.getCurrencySign())

  const planId = searchParams.get('planId') || '10'

  if (!planId) {
    console.log('planId is not found')
    return null
  }

  const selectedPlan = PLAN_ITEMS[currency].find(
    (item) => item.id === parseInt(planId)
  )

  if (!selectedPlan) return null

  const discount = 0
  const subtotal = selectedPlan.price - discount

  return (
    <OrderSummaryContainer subtotal={subtotal} discount={discount}>
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
    </OrderSummaryContainer>
  )
}
