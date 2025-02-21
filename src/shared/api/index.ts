import axios from 'axios'
import type { AxiosRequestConfig } from 'axios'

const DEFAULT_TIMEOUT = 1000 * 30

const env = process.env.NODE_ENV
const isDevelopment = env === 'development'

const newConfig: AxiosRequestConfig = {
  // baseURL: process.env.NEXT_PUBLIC_API_URL,
  baseURL: isDevelopment ? '/proxy' : process.env.NEXT_PUBLIC_API_URL,
  timeout: DEFAULT_TIMEOUT,
  withCredentials: true
}

export const dtsAxios = axios.create(newConfig)
