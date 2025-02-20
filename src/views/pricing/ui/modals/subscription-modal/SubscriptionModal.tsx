'use client'

import { useState } from 'react'

import { useRouter } from 'next/navigation'

import { useCurrencyStore } from '@/views/pricing/model/useCurrencyStore'

import { ModalComponentProps } from '@/shared/ui/modal/model/types'

import { PLAN_NAME_TITLE_MAP, Plan } from '../../plan-Items/model/types'
import { UI_TEXT } from '../constants'
import { AgreementCheckbox, PlanModal } from '../ui'

interface SubscriptionModalProps extends ModalComponentProps {
  item: Plan
}

export const SubscriptionModal = (props: SubscriptionModalProps) => {
  const { onCloseModal, item } = props
  const router = useRouter()

  const [isCheckedAgreement, setIsCheckedAgreement] = useState(false)
  const [isShowError, setIsShowError] = useState(false)

  const currencySign = useCurrencyStore((state) => state.getCurrencySign())

  const title = 'Confirm Your Subscription'
  const description = `You're about to subscribe to the ${PLAN_NAME_TITLE_MAP[item.name]} Plan for ${currencySign}${item.price} per month.`

  return (
    <PlanModal
      title={title}
      description={description}
      onClickActionButton={() => {
        if (isCheckedAgreement === false) {
          setIsShowError(true)
          return
        }
        onCloseModal()
        router.push(`/checkout?planId=${item.id}`)
      }}
      onCloseModal={onCloseModal}
    >
      {/* additional info  */}
      <div className="space-y-2">
        {/* plan */}
        <div className="rounded-[0.5rem] bg-neutral-1 px-5 py-8">
          <div className="flex justify-between">
            <span className="mr-2 w-16 text-[1.125rem] text-neutral-7">
              {UI_TEXT.PLAN}
            </span>

            <div className="text-right">
              <p className="mb-2 text-[1.125rem] font-medium text-primary">
                {PLAN_NAME_TITLE_MAP[item.name]} {UI_TEXT.PLAN}
              </p>
              <p className="font-medium text-neutral-5">
                ({UI_TEXT.CREDITS_DESCRIPTION_1} {item.creditNum}{' '}
                {UI_TEXT.CREDITS_DESCRIPTION_2})
              </p>
            </div>
          </div>
        </div>
        {/* price */}
        <div className="rounded-[0.5rem] bg-neutral-1 px-5 py-8">
          <div className="mb-2 flex justify-between">
            <span className="mr-2 w-16 text-[1.125rem] text-neutral-7">
              Price
            </span>
            <div className="text-right">
              <span className="ml-auto text-[1.125rem]">
                {currencySign}
                {item.price}
              </span>
              <span className="ml-[6px] text-nowrap text-neutral-7">
                / {UI_TEXT.MONTH}
              </span>
            </div>
          </div>

          <p className="text-nowrap text-right text-neutral-5">
            {UI_TEXT.RENEWS_AUTOMATICALLY_UNLESS_CANCELED}
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
