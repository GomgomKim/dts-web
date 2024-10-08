import React from 'react'

import { useImagePreviewUrlStore } from '@/entities/detail/store'

import { convertFileToFormData, isValidImageSize } from '../lib'
import { usePostRemoveBackground } from './adapter'

interface ImageInputBoxParams {
  boxId: string
  onChangeBrandAsset?: () => void
  setErrorMessage: React.Dispatch<React.SetStateAction<string | null>>
}

export const useImageInputBox = (params: ImageInputBoxParams) => {
  const { boxId, onChangeBrandAsset, setErrorMessage } = params

  const removeBackgroundMutation = usePostRemoveBackground()

  const { addImagePreviewUrl, resetImagePreviewUrls } =
    useImagePreviewUrlStore()

  React.useEffect(() => {
    return () => {
      resetImagePreviewUrls()
    }
  }, [resetImagePreviewUrls])

  const handleSubmit = ({ formData }: { formData: FormData }) => {
    setErrorMessage(null)

    removeBackgroundMutation.mutate(
      { source: formData },
      {
        onSuccess: (data) => {
          const blob = new Blob([data], { type: 'image/png' })
          addImagePreviewUrl(boxId, blob)
        },
        onError: () => {
          setErrorMessage('Oops! Try again.')
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
      setErrorMessage('Check the file size or format.')
      e.target.value = ''
      return
    } else {
      setErrorMessage(null)
    }

    handleChangeImageFile(files[0])
    e.target.value = ''
  }

  const handleChangeDNDInput = (file: File) => {
    if (!isValidImageSize(file)) {
      setErrorMessage('Check the file size or format.')
      return
    } else {
      setErrorMessage(null)
    }

    handleChangeImageFile(file)
    onChangeBrandAsset?.()
  }

  return {
    handleChangeInput,
    handleChangeDNDInput,
    isPending: removeBackgroundMutation.isPending
  }
}
