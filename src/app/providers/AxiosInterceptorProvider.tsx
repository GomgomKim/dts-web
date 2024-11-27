'use client'

import { useAxiosAuthInterceptor } from '@/entities/user-profile/lib/useAxiosAuthInterceptor'

export function AxiosInterceptorProvider({
  children
}: React.PropsWithChildren) {
  useAxiosAuthInterceptor()

  return <>{children}</>
}
