import { cn } from '@/shared/lib/utils'
import { Button } from '@/shared/ui/button'

import { nodeToImage } from './lib'

const defaultOption = {
  includeQueryParams: true,
  cacheBust: true,
  pixelRatio: 1,
  skipFonts: true
}

interface ExportButtonProps extends React.ComponentProps<typeof Button> {
  containerRef: React.RefObject<HTMLElement>
  imageType: string
  imageSize: { width: number; height: number }
}

export const ExportButton = (props: ExportButtonProps) => {
  const onButtonClick = () => {
    if (props.containerRef.current === null) return

    const { width, height } = props.imageSize

    nodeToImage(props.imageType, props.containerRef.current, {
      ...defaultOption,
      canvasWidth: width,
      canvasHeight: height
    })
      .then((dataUrl) => {
        const link = document.createElement('a')
        link.download = `${props.imageType}-image-name`
        link.href = dataUrl
        link.click()
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <Button
      onClick={onButtonClick}
      className={cn('leading-[14px]', props.className)}
      stretch
      {...props}
    ></Button>
  )
}
