import { useQuery } from '@tanstack/react-query'

import { useAuthStore } from '../store'
import { getAuthProfile } from './api'
import { AuthProfile, GetAuthProfileResData } from './types'

export const useGetAuthProfile = () => {
  const tokens = useAuthStore((state) => state.tokens)
  const isAuth = useAuthStore((state) => state.isAuth)

  return useQuery<GetAuthProfileResData, Error, AuthProfile>({
    queryKey: ['authProfile'],
    queryFn: () => getAuthProfile(),
    select: (data) => data.content,
    enabled: isAuth === true && tokens !== null,
    throwOnError: true
  })
}
