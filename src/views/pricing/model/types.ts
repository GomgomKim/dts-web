import { PlanName } from '../ui/plan-Items/model/types'

export interface GetMembershipResponse {
  status: string
  plan: PlanName
  modelIds: number[] | null // TODO: 타입
  nextPlanId: number | null
  nextBillingAt: string | null
}
