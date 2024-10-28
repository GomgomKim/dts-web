import { useCallback, useState } from 'react'

import { cn, debounce } from '@/shared/lib/utils'
import { Button } from '@/shared/ui/button'

import AlertIcon from '/public/icons/alert-circle.svg'
import SpinnerIcon from '/public/icons/loading-spinner.svg'

import { v4 } from 'uuid'

import { EXPORT_IMAGE_FORMAT } from '../../type'
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
  imageType: EXPORT_IMAGE_FORMAT
  imageSize: { width: number; height: number }
}

const DELAY_DOWNLOAD_IMAGE = 300

export const ExportButton = (props: ExportButtonProps) => {
  const { containerRef, imageName, imageSize, imageType } = props

  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)

  const HandleButtonClick = async () => {
    if (containerRef.current === null) return

    setIsLoading(true)
    setIsError(false)

    const { width, height } = imageSize

    const randomString10 = v4().slice(0, 10)
    const downloadName = `${getToday()}_${imageName}_${randomString10}.${imageType}`

    // TODO: webp is not supported in Safari

    try {
      const isSafari = /^((?!chrome|android).)*safari/i.test(
        navigator.userAgent
      )
      if (isSafari) {
        await nodeToDataUrl(imageType, containerRef.current, {
          ...defaultOption,
          canvasWidth: width,
          canvasHeight: height
        })
        await nodeToDataUrl(imageType, containerRef.current, {
          ...defaultOption,
          canvasWidth: width,
          canvasHeight: height
        })
        await nodeToDataUrl(imageType, containerRef.current, {
          ...defaultOption,
          canvasWidth: width,
          canvasHeight: height
        })
      }
      const dataUrl = await nodeToDataUrl(imageType, containerRef.current, {
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
    debounce(HandleButtonClick, DELAY_DOWNLOAD_IMAGE),
    [containerRef, imageName, imageSize, imageType, isLoading, isError]
  )

  const isDownloading = !isError && isLoading
  const isReadyToDownload = !isError && !isLoading

  return (
    <Button
      disabled={!isError && isLoading}
      onClick={debounceHandleButtonClick}
      className={cn(
        'rounded-[0.5rem] flex items-center justify-center gap-[0.5rem]',
        {
          'bg-[#FF8480] hover:bg-destructive-hover': isError,
          'py-[11px]': isDownloading || isError
        }
      )}
      stretch
    >
      {isReadyToDownload ? (
        <span className="leading-[14px] text-[0.75rem] font-semibold">
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
      <span className="leading-[14px] text-[0.75rem] font-semibold">
        Downloading...
      </span>
    </>
  )
}

const ErrorInstruction = () => {
  return (
    <>
      <AlertIcon width={16} height={16} stroke="#0F1011" />
      <span className="leading-[14px] text-[0.75rem] font-semibold">
        Try again
      </span>
    </>
  )
}
