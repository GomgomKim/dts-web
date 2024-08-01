import axios from 'axios'
import type { AxiosRequestConfig } from 'axios'

const DEFAULT_TIMEOUT = 1000 * 30

const newConfig: AxiosRequestConfig = {
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: DEFAULT_TIMEOUT
}

export const dtsAxios = axios.create(newConfig)
