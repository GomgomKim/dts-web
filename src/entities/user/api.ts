import { dtsAxios } from '@/shared/api'
import { URL_AUTH_PROFILE } from './constant'
import { GetAuthProfileReqData, GetAuthProfileResData } from './types'
import { AxiosError, AxiosResponse } from 'axios'

export const getAuthProfile = async () => {
  const response = await dtsAxios.get<
    GetAuthProfileReqData,
    AxiosResponse<GetAuthProfileResData, AxiosError>
  >(URL_AUTH_PROFILE)
  return response.data
}
