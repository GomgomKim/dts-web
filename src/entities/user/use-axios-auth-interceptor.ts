import * as React from 'react'
import { useAuthStore } from '@/entities/user/store'
import { useQueryClient } from '@tanstack/react-query'
import { InternalAxiosRequestConfig } from 'axios'
import { dtsAxios } from '@/shared/api'

const useAxiosAuthInterceptor = () => {
  const queryClient = useQueryClient()

  React.useEffect(() => {
    const requestHandler = (config: InternalAxiosRequestConfig) => {
      const { tokens } = useAuthStore.getState()

      if (tokens) {
        config.headers['authorization'] = tokens.accessToken
        config.headers['refresh-token'] = tokens.refreshToken
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

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const responseErrorHandler = async function (error: any) {
      // const originalRequestConfig = error.config
      const { tokens, logOut } = useAuthStore.getState()

      // 3004: 로그인 페이지로 이동?

      // if (error.response?.status !== 401) {
      //   return Promise.reject(error)
      // }

      if (!tokens) {
        logOut(queryClient)
        return Promise.reject(error)
      }

      return Promise.reject(error)
    }

    dtsAxios.interceptors.request.use(requestHandler)
    dtsAxios.interceptors.response.use(responseHandler, responseErrorHandler)
  }, [])
}

export default useAxiosAuthInterceptor
