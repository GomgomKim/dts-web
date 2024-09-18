import { getAuthProfile } from './api'
import { useQuery } from '@tanstack/react-query'
import { useAuthStore } from '../store'
import { AuthProfile, GetAuthProfileResData } from './types'

export const useGetAuthProfile = () => {
  const user = useAuthStore((state) => state.user)

  return useQuery<GetAuthProfileResData, Error, AuthProfile>({
    queryKey: ['authProfile'],
    queryFn: () => getAuthProfile(),
    select: (data) => data.content,
    enabled: user === null
    // && isAuth === true
  })
}
