'use client'

import useAxiosAuthInterceptor from '@/entities/user/use-axios-auth-interceptor'

export default function AxiosInterceptorWrapper({
  children
}: React.PropsWithChildren) {
  useAxiosAuthInterceptor()

  return <>{children}</>
}
