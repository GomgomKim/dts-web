import { getAuthProfile } from './api'
import { useQuery } from '@tanstack/react-query'
import { useAuthStore } from './store'
import { AuthProfile, GetAuthProfileResData } from './model'

export const useGetAuthProfile = () => {
  const { user } = useAuthStore.getState()

  return useQuery<GetAuthProfileResData, Error, AuthProfile>({
    queryKey: ['authProfile'],
    queryFn: () => getAuthProfile(),
    select: (data) => data.content,
    enabled: user === null
    // && isAuth === true
  })
}
