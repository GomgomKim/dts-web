import { useAuthStore } from '@/entities/UserProfile/store'

import { useQueryClient } from '@tanstack/react-query'
import { isAxiosError } from 'axios'

import { ServiceUnavailable } from './ui/ServiceUnavailable'
import { Unauthorized } from './ui/Unauthorized'

export const ErrorModals = ({
  error,
  resetErrorBoundary
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error: any
  resetErrorBoundary: () => void
}) => {
  const queryClient = useQueryClient()
  const logOut = useAuthStore((state) => state.logOut)

  if (!isAxiosError(error)) {
    console.error(error)
  }

  if (error.response?.status === 401) {
    return (
      <Unauthorized
        onClick={() => {
          logOut(queryClient)
          window.location.reload()
          // resetErrorBoundary()
        }}
      />
    )
  }

  return (
    <ServiceUnavailable
      onClick={() => {
        resetErrorBoundary()
        window.location.reload()
      }}
    />
  )
}
