import { useAuthStore } from '@/entities/UserProfile/store'

import { useQueryClient } from '@tanstack/react-query'
import { isAxiosError } from 'axios'

import { Modal } from './Modal'
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

  if (isAxiosError(error) || error.response?.status !== 401) {
    return (
      <Modal>
        <ServiceUnavailable
          onClick={() => {
            resetErrorBoundary()
            window.location.reload()
          }}
        />
      </Modal>
    )
  }

  return (
    <Modal>
      <Unauthorized
        onClick={() => {
          logOut(queryClient)
        }}
      />
    </Modal>
  )
}
