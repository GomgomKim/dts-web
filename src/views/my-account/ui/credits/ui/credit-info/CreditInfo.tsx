import { ExpiringInNDaysCard, RemainingCreditsCard } from './ui'

export const CreditInfo = () => {
  return (
    <div className="flex gap-6">
      <RemainingCreditsCard />
      <ExpiringInNDaysCard />
    </div>
  )
}
