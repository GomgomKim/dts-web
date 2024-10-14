import { Restriction, Tokens } from '@/shared/api/types'

import { QueryClient } from '@tanstack/react-query'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

import { AuthProfile } from './model/types'

const PERSIST_KEY = 'dts-auth-store'

export type AuthUser = Omit<AuthProfile, 'restriction'>

export interface AuthState {
  tokens: Tokens | null
  user: AuthUser | null
  isAuth: boolean | null
  restriction: Restriction | null
}

export interface AuthActions {
  logIn: (tokens: Tokens) => void
  logOut: (queryClient: QueryClient) => void
  setIsAuth: (isAuth: boolean) => void
  setUser: (user: AuthUser) => void
  setRestriction: (restriction: Restriction) => void
}

export const useAuthStore = create(
  persist<AuthState & AuthActions, [], [], Pick<AuthState, 'tokens'>>(
    (set) => ({
      tokens: null,
      user: null,
      isAuth: null,
      restriction: null,
      setUser: (user) => {
        set({ user })
      },
      setIsAuth: (isAuth: boolean) => {
        set({ isAuth })
      },
      setRestriction: (restriction) => {
        const { current } = restriction
        set({ restriction: { current, max: 20 } })
      },
      logIn: (tokens) => {
        set({ tokens, isAuth: true })
      },
      logOut: (queryClient) => {
        queryClient.clear()
        set({
          tokens: null,
          user: null,
          isAuth: false,
          restriction: null
        })
      }
    }),
    {
      name: PERSIST_KEY,
      storage: createJSONStorage(() => localStorage)
    }
  )
)
