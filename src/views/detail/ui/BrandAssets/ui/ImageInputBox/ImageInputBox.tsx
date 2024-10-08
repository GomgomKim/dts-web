'use client'

import * as React from 'react'

import { useImagePreviewUrlStore } from '@/entities/detail/store'

import { DndBox } from '@/shared/lib/hocs/DndBox'
import { Button } from '@/shared/ui/button'

import DashedSvg from '/public/icons/dashed.svg'
import DeleteIcon from '/public/icons/delete.svg'
import SpinnerIcon from '/public/icons/loading-spinner.svg'

import { usePostRemoveBackground } from './model/adapter'

const IMAGE_MAX_SIZE = 5 * 1024 * 1024

const isValidImageSize = (file: File) => {
  return file.size > IMAGE_MAX_SIZE ? false : true
}

interface ImageInputBoxProps {
  boxId: string
  onChangeBrandAsset: () => void
}

export const ImageInputBox = (props: ImageInputBoxProps) => {
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null)

  const {
    imagePreviewUrls,
    addImagePreviewUrl,
    removeImagePreviewUrl,
    resetImagePreviewUrls
  } = useImagePreviewUrlStore()

  const removeBackgroundMutation = usePostRemoveBackground()

  React.useEffect(() => {
    return () => {
      resetImagePreviewUrls()
    }
  }, [resetImagePreviewUrls])

  const convertFileToFormData = (file: File) => {
    const formData = new FormData()
    formData.append('source', file)
    return formData
  }

  const handleSubmit = ({ formData }: { formData: FormData }) => {
    setErrorMessage(null)

    removeBackgroundMutation.mutate(
      { source: formData },
      {
        onSuccess: (data) => {
          const blob = new Blob([data], { type: 'image/png' })
          addImagePreviewUrl(props.boxId, blob)
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
    props?.onChangeBrandAsset()
  }

  const handleClickRemoveButton = () => {
    removeImagePreviewUrl(props.boxId)
    props?.onChangeBrandAsset()
  }

  const renderContent = () => {
    if (imagePreviewUrls.has(props.boxId)) {
      return (
        <div className="h-full">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={imagePreviewUrls.get(props.boxId)}
            alt=""
            className="h-full absolute-center"
          />
          <Button
            variant="secondary"
            size="icon"
            onClick={handleClickRemoveButton}
            className="absolute top-[1rem] right-[1rem] group"
          >
            <DeleteIcon className="stroke-current group-hover:stroke-white" />
          </Button>
        </div>
      )
    } else {
      return (
        <>
          {removeBackgroundMutation.isPending ? (
            <LoadingInstruction />
          ) : (
            <div className="relative">
              <UploadButton id={props.boxId} />
              {errorMessage !== null ? (
                <ErrorInstruction errorMessage={errorMessage} />
              ) : null}
            </div>
          )}
        </>
      )
    }
  }

  return (
    <>
      <input
        type="file"
        id={props.boxId}
        accept=".png,.jpg"
        aria-hidden
        className="a11y-hidden"
        onChange={handleChangeInput}
      />
      <DndBox
        width="100%"
        onDropped={(e) => handleChangeDNDInput(e.dataTransfer.files[0])}
        className="relative rounded-xl bg-neutral-1 bg-opacity-50 p-5 w-[280px] h-[160px] min-[1512px]:w-[387px] min-[1512px]:h-[240px]"
      >
        {!imagePreviewUrls.has(props.boxId) ? (
          <DashedSvg className="absolute inset-0" />
        ) : null}
        {renderContent()}
      </DndBox>
    </>
  )
}

const LoadingInstruction = () => {
  return (
    <div>
      <div className="w-4 h-4 m-auto mb-2">
        <SpinnerIcon className="animate-spin" width="16" height="16" />
      </div>
      <p className="text-neutral-7 text-nowrap text-[0.875rem]">
        Tweaking the background...
      </p>
    </div>
  )
}

const ErrorInstruction = ({ errorMessage }: { errorMessage: string }) => {
  return (
    <p className="absolute bottom-[-0.25rem] translate-y-full w-full text-center text-[0.875rem] text-[#FF8480]">
      {errorMessage}
    </p>
  )
}

const UploadButton = ({ id }: { id: string }) => {
  return (
    <div>
      <div className="mb-3 text-center">
        <Button asChild variant="outline">
          <label htmlFor={id} role="button">
            Upload
          </label>
        </Button>
      </div>
      <p className="text-neutral-5 whitespace-nowrap text-[0.875rem]">
        Supports JPG and PNG up to 5MB
      </p>
    </div>
  )
}
