import { GetMembershipResponse } from '@/views/pricing/model/types'

export interface PutSubscriptionRequest {
  planId: number
}

export interface PutSubscriptionResponse extends GetMembershipResponse {}
