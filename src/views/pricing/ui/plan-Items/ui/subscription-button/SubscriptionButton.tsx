'use client'

import { Button } from '@/shared/ui'
import useModals from '@/shared/ui/modal/model/Modals.hooks'

import { SubscriptionModal } from '../../../modals/subscription-modal'
import { UI_TEXT } from '../../model/constant'
import { Plan } from '../plan-item/type'

interface SubscribeButtonProps {
  item: Plan
  isPopular: boolean
}

export const SubscribeButton = (props: SubscribeButtonProps) => {
  const { openModal } = useModals()

  const handleClickSubscribe = () => {
    openModal(SubscriptionModal, { item: props.item })
  }

  if (props.item.title === 'Unlimited') {
    return (
      <Button
        variant="primary"
        size="small"
        stretch
        className="bg-white font-semibold hover:bg-white"
        onClick={handleClickSubscribe}
      >
        {UI_TEXT.GET_UNLIMITED_ACCESS}
      </Button>
    )
  }

  return (
    <Button
      variant={props.isPopular ? 'primary' : 'outline'}
      size="small"
      stretch
      onClick={handleClickSubscribe}
      className={props.isPopular ? '' : 'bg-inherit'}
    >
      {UI_TEXT.SUBSCRIBE_NOW}
    </Button>
  )
}
