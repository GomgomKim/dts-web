import { useAuthStore } from '@/shared/lib/stores/useAuthStore'

import { useQuery } from '@tanstack/react-query'

import { getMembership } from './api'

export const useGetMemeberShip = () => {
  const isAuth = useAuthStore((state) => state.isAuth)

  return useQuery({
    queryKey: ['membership'],
    queryFn: () => getMembership(),
    staleTime: 60 * 1000,
    gcTime: 300 * 1000,
    enabled: isAuth === true,
    throwOnError: true
  })
}
