import { useCurrencyStore } from '@/views/pricing/model/useCurrencyStore'
import { PLAN_ITEMS } from '@/views/pricing/ui/plan-Items/model/constant'
import { PlanName } from '@/views/pricing/ui/plan-Items/model/types'

export const useGetPlanInfo = () => {
  const currency = useCurrencyStore((state) => state.currency)

  const getPlanById = (id: number) => {
    return PLAN_ITEMS[currency].find((item) => item.id === id)
  }

  const getPlanByName = (name: PlanName) => {
    return PLAN_ITEMS[currency].find((item) => item.name === name)
  }

  return { getPlanById, getPlanByName }
}
