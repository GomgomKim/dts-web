import { useSearchParams } from 'next/navigation'

import { useAuthStore } from '@/entities/UserProfile/store'
import { ASPECT_RATIO_REVERT_MAP } from '@/entities/detail/constant'
import { useAiImageGeneratingStore } from '@/entities/detail/store'

import { FaceAngle } from '@/shared/api/types'

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
  const postAiImageMutaion = usePostAiImageGenerate()

  const handleClickNewGenerate = () => {
    // TODO: 디바운싱 처리
    setIsAiImageGenerating(true)

    // TODO: 선택된 variation이 아니라 baseImageId로 변경
    const encodedBaseImageId = searchParams.get('variation')
    const aspectRatio = searchParams.get('aspectRatio')
    const faceAngle = searchParams.get('faceAngle')

    if (!encodedBaseImageId || !aspectRatio || !faceAngle) {
      return
    }

    postAiImageMutaion.mutate(
      {
        encodedBaseImageId,
        properties: {
          aspectRatio: ASPECT_RATIO_REVERT_MAP[aspectRatio],
          faceAngle: faceAngle as FaceAngle
        }
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
