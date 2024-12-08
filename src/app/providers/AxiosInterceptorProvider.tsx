'use client'

import { useAxiosAuthInterceptor } from '@/entities/profile/ui/profile-menu/lib/useAxiosAuthInterceptor'

export function AxiosInterceptorProvider({
  children
}: React.PropsWithChildren) {
  useAxiosAuthInterceptor()

  return <>{children}</>
}
