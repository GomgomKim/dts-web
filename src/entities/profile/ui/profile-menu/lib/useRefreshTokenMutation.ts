import { useCallback } from 'react'

import { useAuthStore } from '@/shared/lib/stores/useAuthStore'
import { throwIfNotAxiosError } from '@/shared/lib/utils/throwIfNotAxiosError'

import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'

import { postAuthRefreshToken } from './api'

export const USE_REFRESH_TOKEN_MUTATION_KEY = 'refresh-token'

const useRefreshTokenMutation = () => {
  const logIn = useAuthStore((state) => state.logIn)

  const refreshTokenMutation = useMutation({
    mutationKey: [USE_REFRESH_TOKEN_MUTATION_KEY],
    mutationFn: (refreshToken: string) => postAuthRefreshToken(refreshToken)
  })

  const refreshTokens = useCallback(
    async (refreshToken: string) => {
      try {
        const tokens = await refreshTokenMutation.mutateAsync(refreshToken)
        logIn(tokens)
      } catch (e) {
        if (e instanceof AxiosError) {
          throw new Error(e.message)
        } else {
          throwIfNotAxiosError(e)
        }
      }
    },
    [refreshTokenMutation]
  )

  return { refreshTokens, refreshTokenMutation }
}

export default useRefreshTokenMutation
