import { useSearchParams } from 'next/navigation'

import { useCurrencyStore } from '@/views/pricing/model/useCurrencyStore'
import { PLAN_NAME_TITLE_MAP } from '@/views/pricing/ui/plan-Items/model/types'

import { useGetPlanInfo } from '@/shared/lib/hooks/useGetPlanInfo'
import { ErrorBoundary } from '@/shared/ui/error-boundary'

import { UI_TEXT } from '../../../../model/constants'
import { OrderLabeledDetail } from '../OrderLabeledDetail'
import { OrderLabeledMultiDetail } from '../OrderLabeledMultiDetail'
import { PaymentErrorModal } from '../PaymentErrorModal'
import { OrderSummaryContainer } from '../order-summary-container'
import {
  PayNowPaypalButton,
  PayNowTossPaymentsButton
} from '../order-summary-container/ui'
import { PeriodOfUse } from '../period-of-use'

export const PlanOrderSummary = () => {
  const searchParams = useSearchParams()
  const { getPlanById } = useGetPlanInfo()
  const currency = useCurrencyStore((state) => state.currency)
  const currencySign = useCurrencyStore((state) => state.getCurrencySign())

  const planId = searchParams.get('planId')
  if (!planId) return <div>sorry, invalid plan id</div>

  const selectedPlan = getPlanById(parseInt(planId))
  if (!selectedPlan) return <div>sorry, not found the plan by id</div>

  const discount = 0
  const subtotal = selectedPlan.price - discount

  return (
    <OrderSummaryContainer
      subtotal={subtotal}
      discount={discount}
      checkoutButton={
        <>
          <ErrorBoundary
            FallbackComponent={({ error }) => <PaymentErrorModal e={error} />}
          >
            {currency === 'USD' ? (
              <PayNowPaypalButton />
            ) : (
              <PayNowTossPaymentsButton />
            )}
          </ErrorBoundary>
        </>
      }
    >
      <div className="space-y-3 py-6">
        <OrderLabeledDetail
          label={UI_TEXT.PLAN}
          detail={`${PLAN_NAME_TITLE_MAP[selectedPlan?.name]} ${UI_TEXT.PLAN_DESCRIPTION_1} ${selectedPlan?.creditNum} ${UI_TEXT.PLAN_DESCRIPTION_2}`}
        />
        <OrderLabeledMultiDetail
          label={UI_TEXT.BILLING_CYCLE}
          detail_1={<>{UI_TEXT.MONTHLY}</>}
          detail_2={<PeriodOfUse />}
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
