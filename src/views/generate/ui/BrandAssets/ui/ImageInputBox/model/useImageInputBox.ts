import React from 'react'

import { convertFileToFormData, isValidImageSize } from '../lib'
import { usePostRemoveBackground } from './adapter'

interface ImageInputBoxParams {
  handleRemoveBrandAsset: () => void
  handleSuccess: (previewImgSrc: string) => void
  handleErrorMessage: (msg: string | null) => void
}

export const useImageInputBox = (params: ImageInputBoxParams) => {
  const { handleRemoveBrandAsset, handleSuccess, handleErrorMessage } = params

  const removeBackgroundMutation = usePostRemoveBackground()

  const handleSubmit = ({ formData }: { formData: FormData }) => {
    handleErrorMessage(null)

    removeBackgroundMutation.mutate(
      { source: formData },
      {
        onSuccess: (data) => {
          const blob = new Blob([data], { type: 'image/png' })
          const reader = new FileReader()
          reader.onload = (event) => {
            const previewImgSrc = event.target?.result as string
            handleSuccess(previewImgSrc)
          }
          reader.readAsDataURL(blob)
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

    handleRemoveBrandAsset()
  }

  const handleChangeDNDInput = (file: File) => {
    if (!isValidImageSize(file)) {
      handleErrorMessage('Check the file size or format.')
      return
    } else {
      handleErrorMessage(null)
    }

    handleChangeImageFile(file)
    handleRemoveBrandAsset()
  }

  return {
    handleChangeInput,
    handleChangeDNDInput,
    isPending: removeBackgroundMutation.isPending,
    isSuccess: removeBackgroundMutation.isSuccess
  }
}
