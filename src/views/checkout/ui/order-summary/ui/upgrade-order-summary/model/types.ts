export interface PutSubscriptionRequest {
  planId: number
}

export interface PutSubscriptionResponse {
  status: string
  plan: string
  modelIds: number[]
  nextPlanId: number
  nextBillingAt: string
}
