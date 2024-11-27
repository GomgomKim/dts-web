import { useEffect } from 'react'

import { dtsAxios } from '@/shared/api'

// import { useQueryClient } from '@tanstack/react-query'
import { InternalAxiosRequestConfig } from 'axios'

import { useAuthStore } from '../model/store'

export const useAxiosAuthInterceptor = () => {
  useEffect(() => {
    const requestHandler = (config: InternalAxiosRequestConfig) => {
      const { tokens } = useAuthStore.getState()
      if (tokens) {
        config.headers['Authorization'] = tokens.accessToken
        config.headers['Refresh-Token'] = tokens.refreshToken
      }

      return config
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const responseHandler = (response: any) => {
      const { logIn } = useAuthStore.getState()

      if (
        response.headers['authorization'] &&
        response.headers['refresh-token']
      ) {
        const accessToken = response.headers['authorization']
        const refreshToken = response.headers['refresh-token']

        logIn({ accessToken: accessToken, refreshToken: refreshToken })
      }

      return response
    }

    dtsAxios.interceptors.request.use(requestHandler)
    dtsAxios.interceptors.response.use(responseHandler)
  }, [])
}
