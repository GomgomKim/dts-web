'use client'

import { useEffect } from 'react'

import { useImagePreviewUrlStore } from '@/entities/detail/store'

import { DndBox } from '@/shared/lib/hocs/DndBox'
import { cn } from '@/shared/lib/utils'
import { Button } from '@/shared/ui/button'

import DeleteIcon from '/public/icons/delete.svg'

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
  const {
    imagePreviewUrls,
    addImagePreviewUrl,
    removeImagePreviewUrl,
    resetImagePreviewUrls
  } = useImagePreviewUrlStore()

  const removeBackgroundMutation = usePostRemoveBackground()

  useEffect(() => {
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
    removeBackgroundMutation.mutate(
      { source: formData },
      {
        onSuccess: (data) => {
          const blob = new Blob([data], { type: 'image/png' })
          addImagePreviewUrl(props.boxId, blob)
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
      alert('Image size is too large. Please upload an image smaller than 5MB.')
      e.target.value = ''
      return
    }

    handleChangeImageFile(files[0])
    e.target.value = ''
  }

  const handleChangeDNDInput = (file: File) => {
    if (!isValidImageSize(file)) {
      alert('Image size is too large. Please upload an image smaller than 5MB.')
      return
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
            className="absolute top-[1rem] right-[1rem]"
          >
            <DeleteIcon />
          </Button>
        </div>
      )
    } else {
      return (
        <div className="flex flex-col items-center gap-3 absolute-center">
          <div>
            <Button asChild variant="outline">
              <label htmlFor={props.boxId} role="button">
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
        className={cn(
          'relative rounded-xl bg-neutral-1 bg-opacity-50 aspect-[7/4] max-h-[200px]',
          {
            'border border-neutral-3 border-dashed border-2 border-border':
              !imagePreviewUrls.has(props.boxId)
          }
        )}
      >
        {renderContent()}
      </DndBox>
    </>
  )
}
