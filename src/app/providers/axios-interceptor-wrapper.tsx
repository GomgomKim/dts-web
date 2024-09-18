'use client'

import { useAxiosAuthInterceptor } from '@/entities/UserProfile/lib/useAxiosAuthInterceptor'

export function AxiosInterceptorWrapper({ children }: React.PropsWithChildren) {
  useAxiosAuthInterceptor()

  return <>{children}</>
}
