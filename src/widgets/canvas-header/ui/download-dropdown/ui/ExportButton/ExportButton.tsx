import { useCallback, useState } from 'react'

import { cn, debounce } from '@/shared/lib/utils'
import { track } from '@/shared/lib/utils/mixpanel'
import { Button } from '@/shared/ui/button'

import AlertIcon from '/public/icons/alert-circle.svg'
import SpinnerIcon from '/public/icons/loading-spinner.svg'

import { v4 } from 'uuid'

import { EXPORT_IMAGE_FORMAT, EXPORT_IMAGE_QUALITY } from '../../type'
import { nodeToDataUrl } from './lib'

const defaultOption = {
  includeQueryParams: true,
  cacheBust: true,
  pixelRatio: 1,
  skipFonts: true
}

interface ExportButtonProps extends React.ComponentProps<typeof Button> {
  containerRef: React.RefObject<HTMLElement>
  imageName: string
  imageSize: { width: number; height: number }
  imageRatio: string
  imageFormat: EXPORT_IMAGE_FORMAT
  imageQuality: EXPORT_IMAGE_QUALITY
}

const DELAY_DOWNLOAD_IMAGE = 300

export const ExportButton = (props: ExportButtonProps) => {
  const {
    containerRef,
    imageName,
    imageSize,
    imageRatio,
    imageFormat,
    imageQuality
  } = props

  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)

  const handleClickButton = async () => {
    if (containerRef.current === null) return

    setIsLoading(true)
    setIsError(false)

    const { width, height } = imageSize

    const randomString10 = v4().slice(0, 10)
    const downloadName = `${getToday()}_${imageName}_${randomString10}.${imageFormat}`

    try {
      const isSafari = /^((?!chrome|android).)*safari/i.test(
        navigator.userAgent
      )
      if (isSafari) {
        await nodeToDataUrl(imageFormat, containerRef.current, {
          ...defaultOption,
          canvasWidth: width,
          canvasHeight: height
        })
        await nodeToDataUrl(imageFormat, containerRef.current, {
          ...defaultOption,
          canvasWidth: width,
          canvasHeight: height
        })
        await nodeToDataUrl(imageFormat, containerRef.current, {
          ...defaultOption,
          canvasWidth: width,
          canvasHeight: height
        })
      }
      const dataUrl = await nodeToDataUrl(imageFormat, containerRef.current, {
        ...defaultOption,
        canvasWidth: width,
        canvasHeight: height
      })

      const link = document.createElement('a')
      link.download = downloadName
      link.href = dataUrl
      link.click()
      setIsLoading(false)
    } catch (err) {
      console.log(err)
      setIsLoading(false)
      setIsError(true)
    }
  }

  const debounceHandleButtonClick = useCallback(
    debounce(() => {
      handleClickButton()
      track.sendToMixpanel('download_image', {
        image_format: imageFormat,
        image_quality: imageQuality,
        image_ratio: imageRatio
        // image_size: `${imageSize.width}x${imageSize.height}`
      })
    }, DELAY_DOWNLOAD_IMAGE),
    [containerRef, imageName, imageSize, imageFormat, isLoading, isError]
  )

  const isDownloading = !isError && isLoading
  const isReadyToDownload = !isError && !isLoading

  return (
    <Button
      disabled={!isError && isLoading}
      onClick={debounceHandleButtonClick}
      className={cn('flex items-center justify-center gap-2 rounded-[0.5rem]', {
        'bg-[#FF8480] hover:bg-destructive-hover': isError,
        'py-[11px]': isDownloading || isError
      })}
      stretch
    >
      {isReadyToDownload ? (
        <span className="text-[0.75rem] font-semibold leading-[14px]">
          Continue
        </span>
      ) : null}
      {isDownloading ? <DownloadingInstruction /> : null}
      {isError ? <ErrorInstruction /> : null}
    </Button>
  )
}

function getToday() {
  const today = new Date()
  const year = today.getFullYear()
  const month = (today.getMonth() + 1).toString().padStart(2, '0')
  const day = today.getDate().toString().padStart(2, '0')

  return `${year}${month}${day}`
}

const DownloadingInstruction = () => {
  return (
    <>
      <SpinnerIcon
        className="animate-spin"
        width={16}
        height={16}
        fill="#0F1011"
      />
      <span className="text-[0.75rem] font-semibold leading-[14px]">
        Downloading...
      </span>
    </>
  )
}

const ErrorInstruction = () => {
  return (
    <>
      <AlertIcon width={16} height={16} stroke="#0F1011" />
      <span className="text-[0.75rem] font-semibold leading-[14px]">
        Try again
      </span>
    </>
  )
}
