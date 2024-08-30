'use client'

import { useEffect } from 'react'
import { DndBox } from '@/shared/lib/hocs/DndBox'
import { Button } from '@/shared/ui/button'
import DeleteIcon from '/public/icons/delete.svg'
import { useImagePreviewUrlStore } from '@/features/detail/store'
import { usePostAssetRemoveBackground } from '@/entities/detail/adapter'

type ImageInputBoxProps = {
  boxId: string
  onChangeBrandAsset: () => void
}

export const ImageInputBox = ({
  boxId,
  onChangeBrandAsset
}: ImageInputBoxProps) => {
  const {
    imagePreviewUrls,
    addImagePreviewUrl,
    removeImagePreviewUrl,
    resetImagePreviewUrls
  } = useImagePreviewUrlStore()

  const { mutate: postAssetBgRemoveMutation } = usePostAssetRemoveBackground()

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
    postAssetBgRemoveMutation(
      { source: formData },
      {
        onSuccess: (data) => {
          const blob = new Blob([data], { type: 'image/png' })
          addImagePreviewUrl(boxId, blob)
        }
      }
    )
  }

  const handleChangeImageFile = (file: File) => {
    // TODO: 유효성 검사
    // file size check  // 5MB
    // file mime type check
    const formData = convertFileToFormData(file)
    handleSubmit({ formData })
  }

  const handleChangeInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target
    if (!files) return
    handleChangeImageFile(files[0])
    // 성공하면
    e.target.value = ''
  }

  const handleChangeDNDInput = (file: File) => {
    handleChangeImageFile(file)
    onChangeBrandAsset()
  }

  const handleClickRemoveButton = () => {
    removeImagePreviewUrl(boxId)
    onChangeBrandAsset()
  }

  const renderContent = () => {
    if (imagePreviewUrls.has(boxId)) {
      return (
        <div className="h-full">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={imagePreviewUrls.get(boxId)}
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
              <label htmlFor={boxId} role="button">
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
        id={boxId}
        accept=".png,.jpg"
        aria-hidden
        className="a11y-hidden"
        onChange={handleChangeInput}
      />
      <DndBox
        width="100%"
        onDropped={(e) => handleChangeDNDInput(e.dataTransfer.files[0])}
        className="relative border-dashed border-2 border-border rounded-xl bg-[rgba(32,33,36,0.50)] aspect-[7/4] max-h-[200px]"
      >
        {renderContent()}
      </DndBox>
    </>
  )
}
