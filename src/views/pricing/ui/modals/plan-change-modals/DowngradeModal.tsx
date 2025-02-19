'use client'

import { useRouter } from 'next/navigation'

import { usePutSubscription } from '@/views/checkout/ui/order-summary/ui/upgrade-order-summary/model/adapter'
import { useCurrencyStore } from '@/views/pricing/model/useCurrencyStore'

import { throwIfNotAxiosError } from '@/shared/lib/utils/throwIfNotAxiosError'
import { ModalComponentProps } from '@/shared/ui/modal/model/types'

import { AxiosError } from 'axios'

import { Plan } from '../../plan-Items/model/types'
import { UI_TEXT } from '../constants'
import { PlanModal } from '../ui'
import { ComparePlans } from './ui'

interface DowngradeModalProps extends ModalComponentProps {
  myPlan: Plan
  selectedPlan: Plan
}

export const DowngradeModal = (props: DowngradeModalProps) => {
  const { onCloseModal, myPlan, selectedPlan } = props

  const router = useRouter()
  const currencySign = useCurrencyStore((state) => state.getCurrencySign())
  const updateSubscriptionMutation = usePutSubscription()

  const handleClickDowngradeButton = async () => {
    if (!selectedPlan.id) {
      alert('no downgrade plan id')
    }

    const planId = selectedPlan.id

    try {
      await updateSubscriptionMutation.mutateAsync({ planId })
      // if (res?.statusText === 'OK') {
      onCloseModal()
      router.replace('/my-account?tab=subscriptions') // TODO: 다음 플랜이 다운그레이드다 UI 처리 필요
      // }
    } catch (e) {
      if (e instanceof AxiosError) {
        throw new Error(e.message)
      }
      throwIfNotAxiosError(e)
    }
  }

  return (
    <PlanModal
      title={UI_TEXT.DOWNGRADE_PLAN}
      description={UI_TEXT.DOWNGRADE_PLAN_DESCRIPTION}
      actionButtonTitle={UI_TEXT.CONFIRM_CHANGE}
      onClickActionButton={handleClickDowngradeButton}
      onCloseModal={onCloseModal}
    >
      {/* compare plans */}
      <ComparePlans myPlan={myPlan} selectedPlan={selectedPlan} />

      {/* additional info  */}
      <div className="rounded-[0.5rem] bg-neutral-1 px-5 py-8">
        <div className="flex flex-wrap gap-2">
          <span className="text-nowrap text-[1.125rem] text-neutral-7">
            {UI_TEXT.AMOUNT_DUE_ON}
          </span>
          <div className="flex grow justify-between">
            <span className="text-nowrap text-[1.125rem] font-medium text-white">
              {new Date(
                new Date().getTime() + 15 * 24 * 60 * 60 * 1000
              ).toLocaleDateString()}
            </span>
            <p className="inline-block">
              <span className="text-[1.125rem]">
                {currencySign}
                {selectedPlan?.price}
              </span>
              <span className="ml-[6px] text-nowrap text-neutral-7">
                / {UI_TEXT.MONTH}
              </span>
            </p>
          </div>
        </div>
      </div>
    </PlanModal>
  )
}
