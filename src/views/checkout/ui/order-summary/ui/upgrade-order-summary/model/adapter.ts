import { useMutation } from '@tanstack/react-query'

import { putSubscription } from './api'

export const usePutSubscription = () => {
  return useMutation({
    mutationFn: ({ planId }: { planId: number }) => putSubscription(planId)
  })
}
