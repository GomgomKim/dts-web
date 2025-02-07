import axios from 'axios'
import type { AxiosRequestConfig } from 'axios'

const DEFAULT_TIMEOUT = 1000 * 30

const newConfig: AxiosRequestConfig = {
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: DEFAULT_TIMEOUT,
  withCredentials: true
}

export const dtsAxios = axios.create(newConfig)
export const dtsAuthAxios = axios.create({
  ...newConfig,
  baseURL: process.env.NEXT_PUBLIC_AUTH_API_URL
})
