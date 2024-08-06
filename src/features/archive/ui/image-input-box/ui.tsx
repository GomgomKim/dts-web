'use client'

import { DndBox } from '@/shared/lib/hocs/DndBox'
import { Button } from '@/shared/ui/button'
import DeleteIcon from '/public/icons/delete.svg'
import {
  useImageFileStore,
  useImagePreviewUrlStore
} from '@/features/archive/model/store'

export const ImageInputBox = ({ boxId }: { boxId: string }) => {
  const { addImageFile, removeImageFile } = useImageFileStore()
  const { imagePreviewUrls, addImagePreviewUrl, removeImagePreviewUrl } =
    useImagePreviewUrlStore()

  // useEffect(() => {
  //   return () => {
  //     resetImageFiles()
  //     resetImagePreviewUrls()
  //   }
  // }, [])

  const handleChangeImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target
    if (!files) return
    addImageFile(boxId, files[0])
    addImagePreviewUrl(boxId, files[0])
    e.target.value = ''
  }

  const handleRemoveImage = () => {
    removeImageFile(boxId)
    removeImagePreviewUrl(boxId)
  }

  const handleImagePreviewUrl = (image: File) => {
    addImageFile(boxId, image)
    addImagePreviewUrl(boxId, image)
  }

  const renderImagePreview = () => {
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
            onClick={handleRemoveImage}
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
        id={boxId}
        accept=".png,.jpg"
        aria-hidden
        className="a11y-hidden"
        onChange={handleChangeImage}
      />
      <DndBox
        width="100%"
        height="240px"
        onDropped={(e) => handleImagePreviewUrl(e.dataTransfer.files[0])}
        className="relative border-dashed border-2 border-border rounded-xl bg-[rgba(32,33,36,0.50)]"
      >
        {renderImagePreview()}
      </DndBox>
    </>
  )
}
