'use client'

import * as React from 'react'

import { useImagePreviewUrlStore } from '@/entities/generate/store'

import { DndBox } from '@/shared/lib/hocs/DndBox'

import DashedSvg from '/public/icons/dashed.svg'

import { useImageInputBox } from './model/useImageInputBox'
import {
  ErrorInstruction,
  LoadingInstruction,
  RemoveButton,
  UploadButton
} from './ui'

interface ImageInputBoxProps {
  disabled: boolean
  boxId: string
  onRemoveBrandAsset: () => void
  onChangeBrandAssets: (previewImgSrc: string) => void
}

export const ImageInputBox = (props: ImageInputBoxProps) => {
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null)

  const { handleChangeDNDInput, handleChangeInput, isPending } =
    useImageInputBox({
      boxId: props.boxId,
      handleRemoveBrandAsset: () => props.onRemoveBrandAsset(),
      handleSuccess: (previewImgSrc) =>
        props.onChangeBrandAssets(previewImgSrc),
      handleErrorMessage: (msg: string | null) => setErrorMessage(msg)
    })

  const { imagePreviewUrls } = useImagePreviewUrlStore()

  const renderContent = () => {
    if (imagePreviewUrls.has(props.boxId)) {
      return (
        <div className="h-full flex justify-center items-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={imagePreviewUrls.get(props.boxId)}
            alt={props.boxId}
            className="object-contain w-full h-full max-h-[70%] max-w-[70%]"
          />
          <RemoveButton
            onClickRemoveButton={() => props.onRemoveBrandAsset()}
          />
        </div>
      )
    } else {
      return (
        <>
          <DashedSvg className="absolute inset-0 w-full h-full" />
          <div className="relative">
            <UploadButton boxId={props.boxId} />
            {errorMessage !== null ? (
              <ErrorInstruction>{errorMessage}</ErrorInstruction>
            ) : null}
          </div>
        </>
      )
    }
  }

  return (
    <DndBox
      width="100%"
      onDropped={(e) => {
        if (props.disabled) return
        handleChangeDNDInput(e.dataTransfer.files[0])
      }}
      className="group relative rounded-xl bg-neutral-1 bg-opacity-50 p-5 w-[280px] lg:w-[387px] h-[calc(100%-17px-12px)] 2xl:h-[calc(100%-24px-12px)]"
    >
      <input
        type="file"
        id={props.boxId}
        accept=".png,.jpg,.jpeg"
        className="a11y-hidden peer"
        onChange={handleChangeInput}
        disabled={props.disabled}
      />
      {isPending ? <LoadingInstruction /> : renderContent()}
    </DndBox>
  )
}
