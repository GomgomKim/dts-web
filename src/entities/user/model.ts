// TODO: type 위치 수정
import { Restriction } from '../detail/model'

export interface GetAuthProfileReqData {}
export interface GetAuthProfileResData {
  code: number
  message: string
  content: AuthProfile
}

export interface AuthProfile {
  email: string
  profileImageUrl: string
  restriction: Restriction
}
