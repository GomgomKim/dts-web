import { useCurrencyStore } from '@/views/pricing/model/useCurrencyStore'
import { PLAN_NAME_TITLE_MAP } from '@/views/pricing/ui/plan-Items/model/types'

import { useGetPlanInfo } from '@/shared/lib/hooks/useGetPlanInfo'

import { OrderLabeledDetail } from '../OrderLabeledDetail'
import { OrderLabeledMultiDetail } from '../OrderLabeledMultiDetail'
import { OrderSummaryContainer } from '../order-summary-container'
import { PeriodOfUse } from '../period-of-use'
import { UI_TEXT } from './model/constants'

export const UpgradeOrderSummary = () => {
  const { getPlanById } = useGetPlanInfo()

  const currencySign = useCurrencyStore((state) => state.getCurrencySign())

  const currentId = 2
  const upgradeId = 4

  const currentPlan = getPlanById(currentId)
  const upgradePlan = getPlanById(upgradeId)
  if (!currentPlan || !upgradePlan) return null

  return (
    <OrderSummaryContainer subtotal={0} discount={0}>
      {/* section 1 */}
      <div className="space-y-3 py-6">
        <OrderLabeledMultiDetail
          label={UI_TEXT.CURRENT_PLAN}
          detail_1={
            <>
              {PLAN_NAME_TITLE_MAP[currentPlan.name]} {UI_TEXT.PLAN}
            </>
          }
          detail_2={
            <>
              {currencySign}
              {currentPlan.price} {UI_TEXT.PER_MONTH}
            </>
          }
        />
        <OrderLabeledMultiDetail
          label={UI_TEXT.NEW_PLAN}
          detail_1={
            <>
              {PLAN_NAME_TITLE_MAP[upgradePlan.name]} {UI_TEXT.PLAN}
            </>
          }
          detail_2={
            <>
              {currencySign}
              {upgradePlan.price} {UI_TEXT.PER_MONTH}
            </>
          }
        />
        <OrderLabeledMultiDetail
          label={UI_TEXT.BILLING_CYCLE}
          detail_1={<>{UI_TEXT.MONTHLY}</>}
          detail_2={<PeriodOfUse />}
        />
      </div>

      {/* section 2 */}
      <div className="space-y-5 py-8">
        <OrderLabeledDetail
          label={UI_TEXT.PRORATED_CHARGE}
          detail={
            <>
              <div className="mb-1 text-right text-[1.125rem] font-normal text-white">
                {currencySign}하루가격
              </div>
              <div className="text-right text-[1rem] text-neutral-5">
                ({UI_TEXT.FOR_N_DAYS_1} 남은일수 {UI_TEXT.FOR_N_DAYS_2})
              </div>
            </>
          }
        />
        <OrderLabeledDetail
          label={UI_TEXT.UNUSED_TIME_REFUND}
          detail={
            <>
              <div className="mb-1 text-right text-[1.125rem] font-normal text-white">
                -{currencySign}남은일수환불가격
              </div>
              <div className="text-right text-[1rem] text-neutral-5">
                ({UI_TEXT.FOR_THE_REMAINING_DAYS})
              </div>
            </>
          }
        />
      </div>
    </OrderSummaryContainer>
  )
}
