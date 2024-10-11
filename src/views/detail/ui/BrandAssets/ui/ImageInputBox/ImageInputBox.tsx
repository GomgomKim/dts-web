'use client'

import * as React from 'react'

import { useImagePreviewUrlStore } from '@/entities/detail/store'

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
  onChangeBrandAsset: () => void
}

export const ImageInputBox = (props: ImageInputBoxProps) => {
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null)

  const { handleChangeDNDInput, handleChangeInput, isPending } =
    useImageInputBox({
      boxId: props.boxId,
      onChangeBrandAsset: props.onChangeBrandAsset,
      setErrorMessage
    })

  const { imagePreviewUrls } = useImagePreviewUrlStore()

  const renderContent = () => {
    if (imagePreviewUrls.has(props.boxId)) {
      return (
        <div className="h-full">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={imagePreviewUrls.get(props.boxId)}
            alt={props.boxId}
            className="h-full absolute-center"
          />
          <RemoveButton
            onClickRemoveButton={() => props.onChangeBrandAsset()}
          />
        </div>
      )
    } else {
      return (
        <>
          {isPending ? (
            <LoadingInstruction />
          ) : (
            <>
              <DashedSvg className="absolute inset-0 w-full h-full" />
              <div className="relative">
                <UploadButton boxId={props.boxId} />
                {errorMessage !== null ? (
                  <ErrorInstruction>{errorMessage}</ErrorInstruction>
                ) : null}
              </div>
            </>
          )}
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
      className="group relative rounded-xl bg-neutral-1 bg-opacity-50 p-5 w-[280px] h-[160px] min-[1512px]:w-[387px] min-[1512px]:h-[240px]"
    >
      <input
        type="file"
        id={props.boxId}
        accept=".png,.jpg"
        className="a11y-hidden peer"
        onChange={handleChangeInput}
        disabled={props.disabled}
      />
      {renderContent()}
    </DndBox>
  )
}
