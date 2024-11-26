'use client'

import { useAxiosAuthInterceptor } from '@/entities/UserProfile/lib/useAxiosAuthInterceptor'

export function AxiosInterceptorProvider({
  children
}: React.PropsWithChildren) {
  useAxiosAuthInterceptor()

  return <>{children}</>
}
