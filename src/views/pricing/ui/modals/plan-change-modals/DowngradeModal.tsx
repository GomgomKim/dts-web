'use client'

import { useCurrencyStore } from '@/views/pricing/model/useCurrencyStore'

import { ModalComponentProps } from '@/shared/ui/modal/model/types'

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

  const currencySign = useCurrencyStore((state) => state.getCurrencySign())

  return (
    <PlanModal
      title={UI_TEXT.DOWNGRADE_PLAN}
      description={UI_TEXT.DOWNGRADE_PLAN_DESCRIPTION}
      actionButtonTitle={UI_TEXT.CONFIRM_CHANGE}
      onClickActionButton={() => alert('downgrade! move page')}
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
