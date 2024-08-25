// import { jwtDecode } from 'jwt-decode'
import { persist, createJSONStorage } from 'zustand/middleware'
import { create } from 'zustand'
import { Tokens } from './type'
import { GetUsersResData } from './model'
// import { QueryClient } from '@tanstack/react-query'

const PERSIST_KEY = 'dts-auth-store'

export type Aud = 'user'[]

export type DecodedAccessToken = {
  aud: Aud
  exp: number
  iat: number
  sub: string
  vendorId: number
  version: number
}

export type DecodedRefreshToken = {
  aud: Aud
  exp: number
  iat: number
  remember: boolean
  sub: string
}

export type AuthUser = GetUsersResData

export interface AuthState {
  tokens: Tokens | null
  user: AuthUser | null
  isAuth: boolean | null
}

// type SignInType = 'email' | 'naver'

export interface AuthActions {
  // signIn: (tokens: Tokens) => void
  // signOut: (queryClient: QueryClient) => void
  setIsAuth: (isAuth: boolean) => void
  setUser: (user: GetUsersResData) => void
  //   validateToken: (token: string) => boolean
}

export const useAuthStore = create(
  persist<AuthState & AuthActions, [], [], Pick<AuthState, 'tokens'>>(
    (set) => ({
      tokens: null,
      user: null,
      isAuth: null,
      setUser: (user) => {
        set({ user })
      },
      setIsAuth: (isAuth: boolean) => {
        set({ isAuth })
      }
      // signIn: (tokens) => {
      //   set({ tokens, isAuth: true })
      // },
      // signOut: (queryClient) => {
      //   queryClient.clear()
      //   set({
      //     user: null,
      //     tokens: null,
      //     isAuth: false
      //   })
      // }
      //   validateToken: (token: string) => {
      //     try {
      //       const { exp } = jwtDecode<DecodedAccessToken | DecodedRefreshToken>(
      //         token
      //       )
      //       const current = Math.floor(Date.now() / 1000)
      //       return exp > current
      //     } catch (e) {
      //       return false
      //     }
      //   }
    }),
    {
      name: PERSIST_KEY,
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        tokens: state.tokens
      })
    }
  )
)
