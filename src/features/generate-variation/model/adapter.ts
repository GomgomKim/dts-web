import { useMutation } from '@tanstack/react-query'

import { postAiImageGenerate } from './api'
import { PostAiImageReqData } from './types'

export const usePostAiImageGenerate = () => {
  return useMutation({
    mutationFn: ({ encodedBaseImageId }: PostAiImageReqData) =>
      postAiImageGenerate({ encodedBaseImageId })
  })
}
