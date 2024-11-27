import { ResData, Restriction } from '@/shared/api/types'

export interface GetAuthProfileReqData {}

export interface GetAuthProfileResData extends ResData<AuthProfile> {}

export interface AuthProfile {
  email: string
  profileImageUrl: string
  restriction: Restriction
}
