import { useEffect } from 'react'

import { dtsAxios } from '@/shared/api'
import { useAuthStore } from '@/shared/lib/stores/useAuthStore'

import { useQueryClient } from '@tanstack/react-query'
import { AxiosError, InternalAxiosRequestConfig } from 'axios'

import { URL_AUTH_REFRESH_TOKEN } from './constants'
import useRefreshTokenMutation, {
  USE_REFRESH_TOKEN_MUTATION_KEY
} from './useRefreshTokenMutation'

// eslint-disable-next-line @typescript-eslint/ban-types
const refreshSubscribers: Function[] = []

export const useAxiosAuthInterceptor = () => {
  const { refreshTokens } = useRefreshTokenMutation()
  const queryClient = useQueryClient()

  useEffect(() => {
    const requestHandler = (config: InternalAxiosRequestConfig) => {
      const { tokens } = useAuthStore.getState()
      if (tokens) {
        config.headers['Authorization'] = `Bearer ${tokens.accessToken}`
      }

      return config
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const responseErrorHandler = async function (error: any) {
      const originalRequestConfig = error.config
      const { tokens, logOut } = useAuthStore.getState()

      if (error.response?.status !== 401) {
        return Promise.reject(error)
      }

      if (error.config.url === URL_AUTH_REFRESH_TOKEN) {
        return Promise.reject(error)
      }

      if (!tokens) {
        logOut(queryClient)
        return Promise.reject(error)
      }

      const { refreshToken } = tokens

      const isRefreshing = queryClient.isMutating({
        mutationKey: [USE_REFRESH_TOKEN_MUTATION_KEY]
      }) //  return the number of fetching mutations

      if (isRefreshing) {
        return new Promise((resolve) => {
          refreshSubscribers.push(() => {
            resolve(dtsAxios(originalRequestConfig))
          })
        })
      }

      try {
        await refreshTokens(refreshToken)
        refreshSubscribers.forEach((func) => func())
        refreshSubscribers.splice(0)
        return dtsAxios(originalRequestConfig)
      } catch (e) {
        if (e instanceof AxiosError) {
          // if (e.response?.data.message !== 'invalid_refresh_token') {
          //   logOut(queryClient)
          // }
          console.log(e.message)
        }

        return Promise.reject(error)
      }
    }

    const requestInterceptor = dtsAxios.interceptors.request.use(requestHandler)
    const responseInterceptor = dtsAxios.interceptors.response.use(
      (response) => response,
      responseErrorHandler
    )

    return () => {
      dtsAxios.interceptors.request.eject(requestInterceptor)
      dtsAxios.interceptors.response.eject(responseInterceptor)
    }
  }, [])
}
