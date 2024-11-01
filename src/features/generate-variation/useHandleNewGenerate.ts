import * as React from 'react'

import { useSearchParams } from 'next/navigation'

import { GenerationLimit } from '@/views/generate/ui/ErrorModal/ui/GenerationLimit'
import { RequestTimeLimit } from '@/views/generate/ui/ErrorModal/ui/RequestTimeLimit'

import { useAuthStore } from '@/entities/UserProfile/store'
import { useAiImageGeneratingStore } from '@/entities/generate/store'

import { Restriction } from '@/shared/api/types'
import { debounce } from '@/shared/lib/utils'
import useModals from '@/shared/ui/Modal/model/useModals'

import { isAxiosError } from 'axios'

import { usePostAiImageGenerate } from './model/adapter'

const DELAY_NEW_GENERATE = 500

export const useHandleClickNewGenerate = ({
  onErrorGenerate
}: {
  onErrorGenerate: () => void
}) => {
  const { openModal } = useModals()

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
      onErrorGenerate()
      return
    }

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
        },
        onError: (error) => {
          if (!isAxiosError(error)) {
            console.log(error)
            return
          }

          if (error.response?.status === 409) {
            switch (error.response?.data.code) {
              case 5007:
                onErrorGenerate()
                break
              case 5009:
                openModal(GenerationLimit)
                break
              case 5010:
                openModal(RequestTimeLimit)
                break
            }
          } else {
            console.log(error)
            // setTimeout(() => {
            //   throw error
            // })
          }
        }
      }
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
