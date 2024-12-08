import { useCallback } from 'react'

import { usePathname, useSearchParams } from 'next/navigation'

import { GenerationLimit } from '@/views/_generate/ui/ErrorModal/ui/GenerationLimit'
import { RequestTimeLimit } from '@/views/_generate/ui/ErrorModal/ui/RequestTimeLimit'

import { useAiImageGeneratingStore } from '@/entities/generate/store'

import { Restriction } from '@/shared/api/types'
import { useAuthStore } from '@/shared/lib/stores/useAuthStore'
import { debounce } from '@/shared/lib/utils'
import { track } from '@/shared/lib/utils/mixpanel'
import useModals from '@/shared/ui/modal/model/Modals.hooks'

import { isAxiosError } from 'axios'

import { usePostAiImageGenerate } from './model/adapter'

const DELAY_NEW_GENERATE = 100

export const useHandleClickNewGenerate = ({
  onErrorGenerate,
  onHoldingGenerate
}: {
  onErrorGenerate: () => void
  onHoldingGenerate: () => void
}) => {
  const searchParams = useSearchParams()
  const { openModal } = useModals()
  const { setIsAiImageGenerating, addAiImageGeneratingList, addAiImageItems } =
    useAiImageGeneratingStore.getState()

  const pathName = usePathname()
  const modelName = pathName.split('/')[2]
  const modelTag = searchParams.get('tagType')

  const restriction = useAuthStore((state) => state.restriction)
  const setRestriction = useAuthStore((state) => state.setRestriction)

  const postAiImageMutation = usePostAiImageGenerate()

  const isOutOfCredit = restriction !== null ? restriction.current <= 0 : false

  const clickNewGenerate = () => {
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
          const { variations, restriction } = data.content
          addAiImageGeneratingList(variations)
          addAiImageItems(variations)

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
              case 5010: {
                openModal(RequestTimeLimit, { onClickSlot: onHoldingGenerate })
                break
              }
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

  const debounceHandleClickNewGenerate = useCallback(
    debounce(() => {
      clickNewGenerate()
      track.sendToMixpanel('generate_image', {
        model_name: modelName,
        model_tag: modelTag
      })
    }, DELAY_NEW_GENERATE),
    [restriction, modelName, modelTag]
  )

  return { debounceHandleClickNewGenerate, isOutOfCredit }
}

function isValidRestriction(restriction: Restriction | null) {
  if (restriction === null) return false
  if (restriction.current <= 0) return false
  return true
}
