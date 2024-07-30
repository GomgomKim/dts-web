'use client'

import { useEffect, useState } from 'react'
import { DndBox } from '@/shared/lib/hocs/DndBox'
import { Button } from '@/sdcn/components/ui/Button'
import DeleteIcon from '/public/icons/delete.svg'

export const ImageInputBox = () => {
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null)

  //  TODO: remove
  useEffect(() => {
    console.log(imageFile)
  }, [imageFile])

  const handleImagePreviewUrl = (image: File) => {
    const blob = URL.createObjectURL(image)
    setImagePreviewUrl(blob)
  }

  useEffect(() => {
    return () => {
      if (imagePreviewUrl) {
        URL.revokeObjectURL(imagePreviewUrl)
      }
    }
  }, [imagePreviewUrl])

  const onChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target
    if (!files) return
    setImageFile(files[0])
    handleImagePreviewUrl(files[0])
  }

  const onClickDelete = () => {
    setImageFile(null)
    setImagePreviewUrl(null)
  }

  const renderImagePreview = () => {
    if (imagePreviewUrl) {
      return (
        <div className="h-full">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={imagePreviewUrl}
            alt=""
            className="h-full absolute-center"
          />
          <Button
            variant="secondary"
            size="icon"
            onClick={onClickDelete}
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
              <label htmlFor="fileUpload" role="button">
                Upload
              </label>
            </Button>
          </div>
          <p className="text-neutral-5 whitespace-nowrap">
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
        id="fileUpload"
        accept=".png,.jpg"
        aria-hidden
        className="a11y-hidden"
        onChange={onChangeImage}
      />
      <DndBox
        width="100%"
        height="15rem"
        onDropped={(e) => handleImagePreviewUrl(e.dataTransfer.files[0])}
        className="relative border-dashed border-2 border-border rounded-xl bg-[rgba(32,33,36,0.50)]"
      >
        {renderImagePreview()}
      </DndBox>
    </>
  )
}
