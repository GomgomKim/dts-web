'use client'

import { useState } from 'react'

import { ModalComponentProps } from '@/shared/ui/modal/model/types'

import { Plan } from '../../plan-Items/ui/plan-item/type'
import { UI_TEXT } from '../constants'
import { AgreementCheckbox, PlanModal } from '../ui'

interface SubscriptionModalProps extends ModalComponentProps {
  item: Plan
}

export const SubscriptionModal = (props: SubscriptionModalProps) => {
  const { onCloseModal, item } = props

  const [isCheckedAgreement, setIsCheckedAgreement] = useState(false)
  const [isShowError, setIsShowError] = useState(false)

  const title = 'Confirm Your Subscription'
  const description = `You're about to subscribe to the ${item.title} Plan for $${item.price} per month.`

  return (
    <PlanModal
      title={title}
      description={description}
      onClickActionButton={() => {
        if (isCheckedAgreement === false) {
          setIsShowError(true)
          return
        }
        alert('move to payment page')
      }}
      onCloseModal={onCloseModal}
    >
      {/* additional info  */}
      <div className="space-y-2">
        <div className="rounded-[0.5rem] bg-neutral-1 px-5 py-8">
          <div className="flex">
            <span className="mr-2 w-16 text-[1.125rem] text-neutral-7">
              {UI_TEXT.PLAN}
            </span>
            <div>
              <p className="mb-2 text-[1.125rem] font-medium text-primary">
                {item.title}
                {UI_TEXT.PLAN}
              </p>
              <p className="text-[1.125rem] font-medium">
                ({UI_TEXT.CREDITS_DESCRIPTION_1} {item.credits}{' '}
                {UI_TEXT.CREDITS_DESCRIPTION_2})
              </p>
              <p className="mt-4 text-neutral-5">
                {UI_TEXT.RENEWS_AUTOMATICALLY_UNLESS_CANCELED}
              </p>
            </div>
          </div>
        </div>
        <div className="rounded-[0.5rem] bg-neutral-1 px-5 py-8">
          <p className="flex">
            <span className="mr-2 w-16 text-[1.125rem] text-neutral-7">
              Price
            </span>
            <span className="ml-auto text-[1.125rem]">${item.price}</span>
            <span className="ml-[6px] text-nowrap text-neutral-7">
              / {UI_TEXT.MONTH}
            </span>
          </p>
        </div>
      </div>

      {/* agreement checkbox */}
      <AgreementCheckbox
        isChecked={isCheckedAgreement}
        onChange={() => {
          if (isCheckedAgreement === false) {
            setIsShowError(false)
          }
          setIsCheckedAgreement((prev) => !prev)
        }}
        isShowError={isShowError}
      />
    </PlanModal>
  )
}
