import React from 'react'

import { useImagePreviewUrlStore } from '@/entities/generate/store'

import { convertFileToFormData, isValidImageSize } from '../lib'
import { usePostRemoveBackground } from './adapter'

interface ImageInputBoxParams {
  boxId: string
  handleChangeBrandAsset: () => void
  handleSuccess: () => void
  handleErrorMessage: (msg: string | null) => void
}

export const useImageInputBox = (params: ImageInputBoxParams) => {
  const { boxId, handleChangeBrandAsset, handleSuccess, handleErrorMessage } =
    params

  const removeBackgroundMutation = usePostRemoveBackground()

  const { addImagePreviewUrl, resetImagePreviewUrls } =
    useImagePreviewUrlStore()

  React.useEffect(() => {
    return () => {
      resetImagePreviewUrls()
    }
  }, [resetImagePreviewUrls])

  const handleSubmit = ({ formData }: { formData: FormData }) => {
    handleErrorMessage(null)

    removeBackgroundMutation.mutate(
      { source: formData },
      {
        onSuccess: (data) => {
          const blob = new Blob([data], { type: 'image/png' })
          addImagePreviewUrl(boxId, blob)
          handleSuccess()
        },
        onError: () => {
          handleErrorMessage('Oops! Try again.')
        }
      }
    )
  }

  const handleChangeImageFile = (file: File) => {
    const formData = convertFileToFormData(file)
    handleSubmit({ formData })
    // TODO: remove this code after the API is ready
    // const blob = new Blob([file], { type: 'image/png' })
    // addImagePreviewUrl(props.boxId, blob)
  }

  const handleChangeInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target
    if (!files) return

    if (!isValidImageSize(files[0])) {
      handleErrorMessage('Check the file size or format.')
      e.target.value = ''
      return
    } else {
      handleErrorMessage(null)
    }

    handleChangeImageFile(files[0])
    e.target.value = ''

    handleChangeBrandAsset()
  }

  const handleChangeDNDInput = (file: File) => {
    if (!isValidImageSize(file)) {
      handleErrorMessage('Check the file size or format.')
      return
    } else {
      handleErrorMessage(null)
    }

    handleChangeImageFile(file)
    handleChangeBrandAsset()
  }

  return {
    handleChangeInput,
    handleChangeDNDInput,
    isPending: removeBackgroundMutation.isPending,
    isSuccess: removeBackgroundMutation.isSuccess
  }
}
