import { PlanName } from '../ui/plan-Items/model/types'

export interface GetMembershipResponse {
  status: string
  plan: PlanName
  modelIds: number[] // TODO: 타입
  nextPlanId: number // 0 ~ 13
  nextBillingAt: string | null
  isPaid: boolean
}
