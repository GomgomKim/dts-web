import { AuthProfile, ResData } from '@/shared/api/types'

export interface GetAuthProfileReqData {}

export interface GetAuthProfileResData extends ResData<AuthProfile> {}
