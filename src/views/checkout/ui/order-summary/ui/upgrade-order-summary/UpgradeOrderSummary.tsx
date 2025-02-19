'use client'

import { useSearchParams } from 'next/navigation'

import { useGetMemberShip } from '@/views/pricing/model/adapter'
import { useCurrencyStore } from '@/views/pricing/model/useCurrencyStore'
import { PLAN_NAME_TITLE_MAP } from '@/views/pricing/ui/plan-Items/model/types'

import { useGetPlanInfo } from '@/shared/lib/hooks/useGetPlanInfo'
import { ErrorBoundary } from '@/shared/ui/error-boundary'
import { DefaultModal } from '@/shared/ui/modal/DefaultModal'
import useModals from '@/shared/ui/modal/model/Modals.hooks'

import { OrderLabeledDetail } from '../OrderLabeledDetail'
import { OrderLabeledMultiDetail } from '../OrderLabeledMultiDetail'
import { PaymentErrorModal } from '../PaymentErrorModal'
import { OrderSummaryContainer } from '../order-summary-container'
import { PeriodOfUse } from '../period-of-use'
import { UI_TEXT } from './model/constants'
import { UpgradePlanPayNowButton } from './ui'

// TODO: 기존 구독 정보 없으면 해당 페이지 접근 xxx
export const UpgradeOrderSummary = () => {
  const searchParams = useSearchParams()
  const { openModal } = useModals()
  const { getPlanById, getPlanByName } = useGetPlanInfo()
  const currencySign = useCurrencyStore((state) => state.getCurrencySign())

  const upgradePlanId = searchParams.get('upgradePlanId') // TODO: url 접근시 current, upgrade plan id 같은 경우 예외처리?
  // 추후 estimate api로 한 번에 받기(희망)
  const { data: membershipData, isLoading } = useGetMemberShip()
  if (isLoading) return <div>getting membership ...</div>

  if (!membershipData || !upgradePlanId) {
    console.log(
      'no membership data or upgradePlanId ...' + membershipData + upgradePlanId
    )
    return null
  }

  const currentPlanName = membershipData?.plan

  const currentPlan = getPlanByName(currentPlanName)
  const upgradePlan = getPlanById(Number(upgradePlanId))

  if (!currentPlan || !upgradePlan) return null

  if (currentPlan.name === upgradePlan.name) {
    openModal(errorModal) // TODO: 같은 모달 여러번 안뜨게 처리 필요
    return null
  }

  return (
    <OrderSummaryContainer
      subtotal={0}
      discount={0}
      checkoutButton={
        <ErrorBoundary
          FallbackComponent={({ error }) => <PaymentErrorModal e={error} />}
        >
          <UpgradePlanPayNowButton planId={parseInt(upgradePlanId)} />
        </ErrorBoundary>
      }
    >
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

const errorModal = () => (
  <DefaultModal title={''} description={''} footer={''}>
    no upgrade
  </DefaultModal>
)
