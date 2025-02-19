import { useAuthStore } from '@/shared/lib/stores/useAuthStore'

import { useQuery } from '@tanstack/react-query'

import { getMembership } from './api'

export const useGetMemberShip = () => {
  const isAuth = useAuthStore((state) => state.isAuth)

  return useQuery({
    queryKey: ['membership'],
    queryFn: () => getMembership(),
    enabled: isAuth === true,
    throwOnError: true
  })
}
