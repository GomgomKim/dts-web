import axios from 'axios'
import type { AxiosRequestConfig } from 'axios'

const DEFAULT_TIMEOUT = 1000 * 30

const newConfig: AxiosRequestConfig = {
  baseURL: '/api',
  timeout: DEFAULT_TIMEOUT,
  headers: {
    Accept: '*/*'
  }
}

export const dtsAxios = axios.create(newConfig)
