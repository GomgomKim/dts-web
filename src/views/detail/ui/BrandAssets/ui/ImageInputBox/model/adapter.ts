import { useMutation } from '@tanstack/react-query'
import { postRemoveBackground } from './api'
import { PostRemoveBackgroundReqData } from './types'

export const usePostRemoveBackground = () => {
  return useMutation({
    mutationFn: ({ source }: PostRemoveBackgroundReqData) =>
      postRemoveBackground({ source })
  })
}
