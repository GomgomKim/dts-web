'use client'

import { useState } from 'react'

import { DndBox } from '@/shared/lib/hocs/DndBox'

import DashedSvg from '/public/icons/dashed.svg'

import { useImageInputBox } from './model/useImageInputBox'
import { ErrorInstruction, LoadingInstruction, UploadButton } from './ui'

interface ImageInputBoxProps {
  disabled: boolean
  panelId: string
}

export const ImageInputBox = (props: ImageInputBoxProps) => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const { handleChangeDNDInput, handleChangeInput, isPending } =
    useImageInputBox({
      handleSuccess: () => {
        // props.onSuccess(previewImgSrc)
      },
      handleErrorMessage: (msg: string | null) => setErrorMessage(msg)
    })

  return (
    <DndBox
      onDropped={(e) => {
        if (props.disabled) return
        handleChangeDNDInput(e.dataTransfer.files[0])
      }}
      className="group relative h-40 w-full rounded-xl bg-neutral-1/50 p-5"
    >
      <input
        type="file"
        id={props.panelId}
        accept=".png,.jpg,.jpeg"
        className="a11y-hidden peer"
        onChange={handleChangeInput}
        disabled={props.disabled}
      />
      {isPending ? (
        <LoadingInstruction />
      ) : (
        <>
          <div className="relative">
            <UploadButton disabled={props.disabled} inputId={props.panelId} />
            {errorMessage !== null ? (
              <ErrorInstruction>{errorMessage}</ErrorInstruction>
            ) : null}
          </div>
          <DashedSvg className="absolute inset-0 size-full" />
        </>
      )}
    </DndBox>
  )
}
