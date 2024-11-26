'use client'

import { useState } from 'react'

import useApiError from '@/shared/lib/hooks/useApiError'

import {
  QueryCache,
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

export function ReactQueryClientProvider({
  children
}: React.PropsWithChildren) {
  const { handleError } = useApiError()

  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            //   staleTime: 60 * 1000
            refetchOnWindowFocus: false,
            refetchOnMount: true,
            refetchOnReconnect: false,
            retry: 0,
            networkMode: 'always'
          },
          mutations: {
            onError: handleError,
            networkMode: 'always'
          }
        },
        queryCache: new QueryCache({
          onError: handleError
        })
      })
  )

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}
