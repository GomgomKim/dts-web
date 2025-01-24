import { BillingNPaymentCard, CurrentPlanCard } from './ui'

export const SubscriptionInfo = () => {
  const isSubscribing = true
  return (
    <div className="flex gap-6">
      <CurrentPlanCard isSubscribing={isSubscribing} />
      <BillingNPaymentCard isSubscribing={isSubscribing} />
    </div>
  )
}
