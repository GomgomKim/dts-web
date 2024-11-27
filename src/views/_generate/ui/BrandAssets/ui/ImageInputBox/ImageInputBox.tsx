'use client'

import { useState } from 'react'

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
  imagePreviewUrl: string | undefined
  onRemoveBrandAsset: () => void
  onChangeBrandAssets: (previewImgSrc: string) => void
}

export const ImageInputBox = (props: ImageInputBoxProps) => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const { handleChangeDNDInput, handleChangeInput, isPending } =
    useImageInputBox({
      handleRemoveBrandAsset: props.onRemoveBrandAsset,
      handleSuccess: props.onChangeBrandAssets,
      handleErrorMessage: (msg: string | null) => setErrorMessage(msg)
    })

  const renderContent = () => {
    if (props.imagePreviewUrl) {
      return (
        <div className="flex h-full items-center justify-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={props.imagePreviewUrl}
            alt={props.boxId}
            className="size-full max-h-[70%] max-w-[70%] object-contain"
          />
          <RemoveButton
            onClickRemoveButton={() => props.onRemoveBrandAsset()}
          />
        </div>
      )
    } else {
      return (
        <>
          <DashedSvg className="absolute inset-0 size-full" />
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
      className="group relative h-[calc(100%-17px-12px)] w-[280px] rounded-xl bg-neutral-1/50 p-5 lg:w-[387px] 2xl:h-[calc(100%-24px-12px)]"
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
