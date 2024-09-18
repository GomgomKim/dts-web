import { persist, createJSONStorage } from 'zustand/middleware'
import { create } from 'zustand'
import { AuthProfile } from './model/types'
import { QueryClient } from '@tanstack/react-query'
import { Restriction, Tokens } from '@/shared/api/types'

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
        set({ restriction })
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
