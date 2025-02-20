import { useEffect } from 'react'

import { dtsAuthAxios } from '@/shared/api'
import { useAuthStore } from '@/shared/lib/stores/useAuthStore'

import { InternalAxiosRequestConfig } from 'axios'

export const useAxiosAuthInterceptor = () => {
  useEffect(() => {
    const requestHandler = (config: InternalAxiosRequestConfig) => {
      const { tokens } = useAuthStore.getState()
      if (tokens) {
        config.headers['Authorization'] = `Bearer ${tokens.accessToken}`
      }

      return config
    }

    dtsAuthAxios.interceptors.request.use(requestHandler)
  }, [])
}
