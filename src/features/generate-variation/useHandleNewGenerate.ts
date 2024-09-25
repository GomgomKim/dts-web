import { useSearchParams } from 'next/navigation'

import { useAuthStore } from '@/entities/UserProfile/store'
import { useAiImageGeneratingStore } from '@/entities/detail/store'

import { usePostAiImageGenerate } from './model/adapter'

export const useHandleClickNewGenerate = () => {
  const searchParams = useSearchParams()
  const addAiImageGeneratingList = useAiImageGeneratingStore(
    (state) => state.addAiImageGeneratingList
  )

  const setRestriction = useAuthStore((state) => state.setRestriction)
  const setIsAiImageGenerating = useAiImageGeneratingStore(
    (state) => state.setIsAiImageGenerating
  )
  const addAiImageItem = useAiImageGeneratingStore(
    (state) => state.addAiImageItem
  )
  const postAiImageMutation = usePostAiImageGenerate()

  const handleClickNewGenerate = () => {
    // TODO: 디바운싱 처리
    setIsAiImageGenerating(true)

    const mainImageId = searchParams.get('id')

    if (!mainImageId) {
      alert('Invalid main image id')
      return
    }

    postAiImageMutation.mutate(
      {
        mainImageId: Number(mainImageId)
      },
      {
        onSuccess: (data) => {
          const { variation, restriction } = data.content
          addAiImageGeneratingList([variation])
          addAiImageItem(variation)

          setRestriction(restriction)
        }
      }
      // onError
    )
  }

  return { handleClickNewGenerate }
}
