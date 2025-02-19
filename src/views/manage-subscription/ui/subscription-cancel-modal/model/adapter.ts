import { useMutation } from '@tanstack/react-query'

import { deleteSubscription } from './api'

export const useDeleteSubscription = () => {
  return useMutation({
    mutationFn: () => deleteSubscription()
  })
}
