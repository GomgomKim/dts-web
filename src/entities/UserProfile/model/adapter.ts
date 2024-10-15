import { useQuery } from '@tanstack/react-query'

// import { useAuthStore } from '../store'
import { getAuthProfile } from './api'
import { AuthProfile, GetAuthProfileResData } from './types'

export const useGetAuthProfile = () => {
  return useQuery<GetAuthProfileResData, Error, AuthProfile>({
    queryKey: ['authProfile'],
    queryFn: () => getAuthProfile(),
    select: (data) => data.content
  })
}
