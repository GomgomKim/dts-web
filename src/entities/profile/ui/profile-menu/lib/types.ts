import { Tokens } from '@/shared/api/types'

export interface PostAuthRefreshTokenRequest {
  refreshToken: string
}
export type PostAuthRefreshTokenResponse = Tokens
