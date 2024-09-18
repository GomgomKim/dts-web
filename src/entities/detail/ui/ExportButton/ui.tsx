import { useCallback } from 'react'
import { toImage } from './utils'
import { Button } from '@/shared/ui/button'
import { cn } from '@/shared/lib/utils'

const defaultOption = {
  includeQueryParams: true,
  cacheBust: true,
  pixelRatio: 1,
  skipFonts: true
}

interface ExportButtonProps extends React.ComponentProps<typeof Button> {
  containerRef: React.RefObject<HTMLElement>
  imgType: string
  imgSize: { width: number; height: number }
}

export const ExportButton = (props: ExportButtonProps) => {
  const onButtonClick = useCallback(() => {
    if (props.containerRef.current === null) return

    toImage(props.imgType, props.containerRef.current, {
      ...defaultOption,
      ...props.imgSize
    })
      .then((dataUrl) => {
        const link = document.createElement('a')
        link.download = `${props.imgType}-image-name`
        link.href = dataUrl
        link.click()
      })
      .catch((err) => {
        console.log(err)
      })
  }, [props.containerRef])

  return (
    <Button
      onClick={onButtonClick}
      className={cn('leading-[14px]', props.className)}
      stretch
      {...props}
    ></Button>
  )
}
