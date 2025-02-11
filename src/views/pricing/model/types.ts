import { PlanName } from '../ui/plan-Items/model/types'

export interface GetMembershipResonse {
  // TODO: 타입
  status: string
  plan: PlanName
  modelIds: number[] | null
  nextPlanId: number | null
  nextBillingAt: Date | null
}
