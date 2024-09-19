import * as React from 'react'
// import { useQueryClient } from '@tanstack/react-query'
import { InternalAxiosRequestConfig } from 'axios'
import { dtsAxios } from '@/shared/api'
import { useAuthStore } from '../store'

export const useAxiosAuthInterceptor = () => {
  // const queryClient = useQueryClient()

  React.useEffect(() => {
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
      if (
        response.headers['authorization'] &&
        response.headers['refresh-token']
      ) {
        const { logIn } = useAuthStore.getState()

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
