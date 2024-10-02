import { useState } from 'react'

import { cn } from '@/shared/lib/utils'
import { Button } from '@/shared/ui/button'

import { v4 } from 'uuid'

import { EXPORT_IMAGE_FORMAT } from '../../type'
import { nodeToImage } from './lib'

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

export const ExportButton = (props: ExportButtonProps) => {
  const { containerRef, imageName, imageSize, imageType } = props

  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)

  const onButtonClick = () => {
    if (containerRef.current === null) return

    setIsLoading(true)
    setIsError(false)

    const { width, height } = imageSize

    const randomString10 = v4().slice(0, 10)
    const downloadName = `${getToday()}_${imageName}_${randomString10}`

    nodeToImage(imageType, containerRef.current, {
      ...defaultOption,
      canvasWidth: width,
      canvasHeight: height
    })
      .then((dataUrl) => {
        const link = document.createElement('a')
        link.download = downloadName
        link.href = dataUrl
        link.click()
        setIsLoading(false)
        // setIsError(false)
      })
      .catch((err) => {
        console.log(err)
        setIsLoading(false)
        setIsError(true)
      })
  }

  return (
    <Button
      disabled={!isError && isLoading}
      onClick={onButtonClick}
      className={cn(
        'leading-[14px] rounded-[8px] text-[0.75rem] font-semibold',
        {
          'bg-[#FF8480]': isError
        }
      )}
      stretch
    >
      {!isError && (isLoading ? 'Downloading ...' : 'Continue')}
      {isError && 'Try Again'}
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
