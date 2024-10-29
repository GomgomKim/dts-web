import * as React from 'react'

import { useSearchParams } from 'next/navigation'

import { useAuthStore } from '@/entities/UserProfile/store'
import { useAiImageGeneratingStore } from '@/entities/generate/store'

import { Restriction } from '@/shared/api/types'
import { debounce } from '@/shared/lib/utils'

import { usePostAiImageGenerate } from './model/adapter'

const DELAY_NEW_GENERATE = 500

export const useHandleClickNewGenerate = () => {
  const searchParams = useSearchParams()
  const addAiImageGeneratingList = useAiImageGeneratingStore(
    (state) => state.addAiImageGeneratingList
  )

  const restriction = useAuthStore((state) => state.restriction)
  const setRestriction = useAuthStore((state) => state.setRestriction)
  const setIsAiImageGenerating = useAiImageGeneratingStore(
    (state) => state.setIsAiImageGenerating
  )
  const addAiImageItem = useAiImageGeneratingStore(
    (state) => state.addAiImageItem
  )
  const postAiImageMutation = usePostAiImageGenerate()

  const isOutOfCredit = restriction !== null ? restriction.current <= 0 : false

  const handleClickNewGenerate = () => {
    if (!isValidRestriction(restriction)) {
      alert('You have reached the limit of generating variations')
      return
    }

    // TODO: 409 에러처리
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

  const debounceHandleClickNewGenerate = React.useCallback(
    debounce(handleClickNewGenerate, DELAY_NEW_GENERATE),
    []
  )

  return { debounceHandleClickNewGenerate, isOutOfCredit }
}

function isValidRestriction(restriction: Restriction | null) {
  if (restriction === null) return false
  if (restriction.current <= 0) return false
  return true
}
