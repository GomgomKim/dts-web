'use client'

import { ComparePlans } from '@/views/pricing/ui/modals/plan-change-modals/ui'
import { PlanModal } from '@/views/pricing/ui/modals/ui'
import { PLAN_CANCEL } from '@/views/pricing/ui/plan-Items/model/constant'
import { Plan } from '@/views/pricing/ui/plan-Items/model/types'

import { cn } from '@/shared/lib/utils'
import { ModalComponentProps } from '@/shared/ui/modal/model/types'

import { useQueryClient } from '@tanstack/react-query'

import { UI_TEXT } from '../../model/constants'
import { useDeleteSubscription } from './model/adapter'

interface SubscriptionCancelModalProps extends ModalComponentProps {
  myPlan: Plan
}

export const SubscriptionCancelModal = (
  props: SubscriptionCancelModalProps
) => {
  const { onCloseModal } = props
  const queryClient = useQueryClient()
  const cancelSubscriptionMutation = useDeleteSubscription()

  const selectedPlan = PLAN_CANCEL

  // TODO: tailwind 커스텀 스타일 지정?
  const underlineStyle =
    'relative pb-5 mb-5 after:absolute after:bottom-0 after:left-0 after:w-full after:border-b after:border-neutral-2 after:content-[""]'

  const handleClickCancelButton = async () => {
    try {
      const res = await cancelSubscriptionMutation.mutateAsync()
      if (res.message === 'succeeded') {
        onCloseModal()
        // TODO:
        queryClient.invalidateQueries({ queryKey: ['membership'] })
      }
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <PlanModal
      title={UI_TEXT.CANCEL_SUBSCRIPTION}
      description={
        <p>
          {UI_TEXT.CANCEL_SUBSCRIPTION_DESCRIPTION_1}{' '}
          <span className="text-white">2024. 12. 25</span>,{' '}
          {UI_TEXT.CANCEL_SUBSCRIPTION_DESCRIPTION_2}.
        </p>
      }
      actionButtonTitle="Cancel Subscription"
      onClickActionButton={handleClickCancelButton}
      onCloseModal={onCloseModal}
    >
      {/* compare plans */}
      <ComparePlans myPlan={props.myPlan} selectedPlan={selectedPlan} />

      {/* additional info  */}
      <div className="rounded-[0.5rem] bg-neutral-1 px-5 py-8">
        <div
          className={cn(
            'flex flex-wrap justify-between gap-2 text-nowrap [&_*]:text-[1.125rem]',
            underlineStyle
          )}
        >
          <span className=" text-neutral-7">
            {UI_TEXT.SUBSCRIPTION_VALID_UNTIL}
          </span>
          <span>구독 마감날짜</span>
        </div>
        <ul className="text-neutral-7 [&_li]:ml-6 [&_li]:list-disc [&_strong]:font-medium [&_strong]:text-white">
          <li>{UI_TEXT.SUBSCRIPTION_VALID_UNTIL_DESCRIPTION_ONE}.</li>
          <li>{UI_TEXT.SUBSCRIPTION_VALID_UNTIL_DESCRIPTION_TWO}.</li>
        </ul>
      </div>
    </PlanModal>
  )
}
