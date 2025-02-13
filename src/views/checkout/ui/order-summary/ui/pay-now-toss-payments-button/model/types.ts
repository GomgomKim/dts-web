export interface PostPaymentSubscriptionRequest {
  planId: number
  billingKey: string
}

export interface PostPaymentSubscriptionResponse {
  status: string
  plan: string
  modelIds: null
  nextPlanId: number | null
  nextBillingAt: string | null
}
