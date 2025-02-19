'use client'

import { useState } from 'react'

import { useRouter } from 'next/navigation'

import { GetMembershipResponse } from '@/views/pricing/model/types'
import { useCurrencyStore } from '@/views/pricing/model/useCurrencyStore'

import { cn } from '@/shared/lib/utils'
import { ModalComponentProps } from '@/shared/ui/modal/model/types'

import { useQueryClient } from '@tanstack/react-query'

import { PLAN_NAME_TITLE_MAP, Plan } from '../../plan-Items/model/types'
import { UI_TEXT } from '../constants'
import { AgreementCheckbox, PlanModal } from '../ui'
import { ComparePlans } from './ui/ComparePlans'

const STANDARD_PERIOD_OF_USE = 30

interface UpgradeModalProps extends ModalComponentProps {
  myPlan: Plan
  selectedPlan: Plan
}

export const UpgradeModal = (props: UpgradeModalProps) => {
  const { onCloseModal, myPlan, selectedPlan } = props
  const queryClient = useQueryClient()
  const router = useRouter()
  const [isChecked, setIsChecked] = useState(false)
  const [isShowError, setIsShowError] = useState(false)
  const currencySign = useCurrencyStore((state) => state.getCurrencySign())

  const membershipData = queryClient.getQueryData<
    GetMembershipResponse,
    ['membership']
  >(['membership'])

  if (!membershipData || !membershipData.nextBillingAt) {
    console.error('membershipData is null')
    return null
  }

  const remainDays = getDaysRemaining(membershipData.nextBillingAt)
  const priceDifference = getPriceDifference(
    remainDays,
    myPlan.price,
    selectedPlan.price
  )

  const underlineStyle =
    'relative pb-5 mb-5 after:absolute after:bottom-0 after:left-0 after:w-full after:border-b after:border-neutral-2 after:content-[""]'

  return (
    <PlanModal
      title={UI_TEXT.UPGRADE_PLAN}
      description={UI_TEXT.UPGRADE_PLAN_DESCRIPTION}
      onClickActionButton={() => {
        if (isChecked === false) {
          setIsShowError(true)
          return
        }

        onCloseModal()
        router.push(`/checkout?upgradePlanId=${selectedPlan?.id}`)
      }}
      onCloseModal={onCloseModal}
    >
      {/* compare plans */}
      <ComparePlans myPlan={myPlan} selectedPlan={selectedPlan} />

      {/* additional info  */}
      <div className="rounded-[0.5rem] bg-neutral-1 px-5 py-8">
        <div className={cn('flex flex-col gap-2', underlineStyle)}>
          <span className="text-nowrap text-[1.125rem] text-neutral-7">
            {UI_TEXT.ADDITIONAL_CHARGE}
          </span>
          <div className="flex grow justify-between">
            <span className="text-nowrap text-[1.125rem] text-white">
              {new Date().toLocaleDateString()}
            </span>
            <p className="inline-block">
              <span className="text-[1.125rem]">
                {currencySign}
                {priceDifference}
              </span>
              <span className="ml-[6px] text-nowrap text-neutral-7">
                / {UI_TEXT.PRORATED_FOR} {remainDays} {UI_TEXT.DAYS}
              </span>
            </p>
          </div>
        </div>
        <p className="text-neutral-7 [&_strong]:font-medium [&_strong]:text-white">
          {UI_TEXT.UPGRADE_MODAL_DESCRIPTION_1}{' '}
          <strong>
            {PLAN_NAME_TITLE_MAP[selectedPlan.name]}{' '}
            {UI_TEXT.UPGRADE_MODAL_DESCRIPTION_2} {currencySign}
            {priceDifference}{' '}
          </strong>
          {UI_TEXT.UPGRADE_MODAL_DESCRIPTION_3}{' '}
          <strong>
            {currencySign}
            {selectedPlan.price} {UI_TEXT.UPGRADE_MODAL_DESCRIPTION_4}{' '}
            {new Date(membershipData.nextBillingAt).toLocaleDateString(
              'en-US',
              {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              }
            )}
          </strong>
        </p>
      </div>

      {/* agree checkbox */}
      <AgreementCheckbox
        isChecked={isChecked}
        onChange={() => {
          if (isChecked === false) {
            setIsShowError(false)
          }
          setIsChecked((prev) => !prev)
        }}
        isShowError={isShowError}
      />
    </PlanModal>
  )
}

const getDaysRemaining = (targetDateString: string | null) => {
  if (!targetDateString) return 0

  const today = new Date()
  const targetDate = new Date(targetDateString)

  // 두 날짜의 차이를 밀리초 단위로 계산
  const timeDifference = targetDate.getTime() - today.getTime()

  // 밀리초를 일 단위로 변환 (1일 = 24 * 60 * 60 * 1000 밀리초)
  const daysRemaining = Math.floor(timeDifference / (1000 * 60 * 60 * 24))

  return daysRemaining
}

// TODO: js 소수 이슈로 정확한 계산을 위한 라이브러리 도입 필요 & 백에서 정확한 값 가져오기
const getPriceDifference = (
  remainDays: number,
  myPlanPrice: number,
  selectedPlanPrice: number
) => {
  const currentPlanPriceOfDay = roundToFirstDecimal(
    myPlanPrice / STANDARD_PERIOD_OF_USE
  )
  const selectedPlanPriceOfDay = roundToFirstDecimal(
    selectedPlanPrice / STANDARD_PERIOD_OF_USE
  )

  const priceDifference =
    Number((selectedPlanPriceOfDay - currentPlanPriceOfDay).toFixed(1)) *
    remainDays

  return priceDifference
}

const roundToFirstDecimal = (num: number) => {
  return Math.round(num * 10) / 10
}
