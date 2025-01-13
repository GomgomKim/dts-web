import React from 'react'

import { Asset, AssetType } from '@/shared/api/types'

import { useQueryClient } from '@tanstack/react-query'

import { isValidImageSize } from '../lib'
import { usePostAsset } from './adapter'

interface ImageInputBoxParams {
  assetType: AssetType
  handleSuccess: (asset: Asset) => void
  handleErrorMessage: (msg: string | null) => void
}

export const useImageInputBox = (params: ImageInputBoxParams) => {
  const queryClient = useQueryClient()
  const { handleErrorMessage } = params

  const uploadAssetMutation = usePostAsset()

  const handleSubmit = (file: File) => {
    handleErrorMessage(null)

    const formData = new FormData()
    formData.append('asset', file)

    uploadAssetMutation.mutate(
      { asset: formData, assetType: params.assetType },
      {
        onSuccess: (response) => {
          params.handleSuccess(response.data.content.asset)

          queryClient.invalidateQueries({
            queryKey: ['assets', params.assetType]
          })
        },
        onError: (e) => {
          console.error(e)
          handleErrorMessage('Oops! Try again.')
        }
      }
    )
  }

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target
    if (!files) return

    if (!isValidImageSize(files[0])) {
      handleErrorMessage('Check the file size or format.')
      e.target.value = ''
      return
    } else {
      handleErrorMessage(null)
    }

    handleSubmit(files[0])
    e.target.value = ''
  }

  const handleChangeDNDInput = (file: File) => {
    if (!isValidImageSize(file)) {
      handleErrorMessage('Check the file size or format.')
      return
    } else {
      handleErrorMessage(null)
    }

    handleSubmit(file)
  }

  return {
    handleChangeInput,
    handleChangeDNDInput,
    isPending: uploadAssetMutation.isPending,
    isSuccess: uploadAssetMutation.isSuccess
  }
}
