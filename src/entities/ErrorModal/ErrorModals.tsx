import { useAuthStore } from '@/entities/UserProfile/store'

import { useQueryClient } from '@tanstack/react-query'
import { isAxiosError } from 'axios'

// import { ServiceUnavailable } from './ui/ServiceUnavailable'
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

  // const isTokenError =
  //   error.response?.status === 401 ||
  //   (error.response?.status === 500 && error.response?.data?.code === 9003)

  // if (isTokenError) {
  return (
    <Unauthorized
      onClickButton={() => {
        logOut(queryClient)
        resetErrorBoundary()
      }}
    />
  )
  // }

  // return (
  //   <ServiceUnavailable
  //     onClick={() => {
  //       resetErrorBoundary()
  //       window.location.reload()
  //     }}
  //   />
  // )
}
