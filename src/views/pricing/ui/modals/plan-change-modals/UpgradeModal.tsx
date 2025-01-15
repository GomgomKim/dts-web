'use client'

import { useState } from 'react'

import { cn } from '@/shared/lib/utils'
import { ModalComponentProps } from '@/shared/ui/modal/model/types'

import { Plan } from '../../plan-Items/ui/plan-item/type'
import { UI_TEXT } from '../constants'
import { AgreementCheckbox, PlanModal } from '../ui'
import { ComparePlans } from './ui/ComparePlans'

interface UpgradeModalProps extends ModalComponentProps {
  myPlan: Plan
  selectedPlan: Plan
}

const DUMMY_DAYS = 15

export const UpgradeModal = (props: UpgradeModalProps) => {
  const { onCloseModal, myPlan, selectedPlan } = props

  const [isChecked, setIsChecked] = useState(false)
  const [isShowError, setIsShowError] = useState(false)

  const priceDifference =
    (selectedPlan?.price as number) - (myPlan?.price as number)

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
        alert('upgrade! move page')
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
              <span className="text-[1.125rem]">${priceDifference}</span>
              <span className="ml-[6px] text-nowrap text-neutral-7">
                / {UI_TEXT.PRORATED_FOR} {DUMMY_DAYS} {UI_TEXT.DAYS}
              </span>
            </p>
          </div>
        </div>
        <p className="text-neutral-7 [&_strong]:font-medium [&_strong]:text-white">
          {UI_TEXT.UPGRADE_MODAL_DESCRIPTION_1}{' '}
          <strong>
            {selectedPlan?.title} {UI_TEXT.UPGRADE_MODAL_DESCRIPTION_2} $
            {priceDifference}{' '}
          </strong>
          {UI_TEXT.UPGRADE_MODAL_DESCRIPTION_3}{' '}
          <strong>
            ${selectedPlan?.price} {UI_TEXT.UPGRADE_MODAL_DESCRIPTION_4}{' '}
            {new Date(
              new Date().getTime() + DUMMY_DAYS * 24 * 60 * 60 * 1000
            ).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
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
