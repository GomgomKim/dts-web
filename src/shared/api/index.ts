import axios from 'axios'
import type { AxiosRequestConfig } from 'axios'

const DEFAULT_TIMEOUT = 1000 * 30

const newConfig: AxiosRequestConfig = {
  baseURL: 'http://dev.api.dtsdevs.com:8080',
  timeout: DEFAULT_TIMEOUT,
  withCredentials: true
}

export const dtsAxios = axios.create(newConfig)
