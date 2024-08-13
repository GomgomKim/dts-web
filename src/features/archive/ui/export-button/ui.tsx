import { useCallback } from 'react'
import { toPng } from 'html-to-image'
import { Button } from '@/shared/ui/button'
import { cn } from '@/shared/lib/utils'

type ExportButtonProps = React.ComponentProps<typeof Button> & {
  containerRef: React.RefObject<HTMLElement>
}

export const ExportButton = ({
  containerRef,
  className,
  ...props
}: ExportButtonProps) => {
  const onButtonClick = useCallback(() => {
    if (containerRef.current === null) return

    toPng(containerRef.current, {
      includeQueryParams: true,
      cacheBust: true,
      pixelRatio: 2,
      skipFonts: true
    })
      .then((dataUrl) => {
        const link = document.createElement('a')
        link.download = 'my-image-name.png'
        link.href = dataUrl
        link.click()
      })
      .catch((err) => {
        console.log(err)
      })
  }, [containerRef])

  return (
    <Button
      {...props}
      variant="outline"
      onClick={onButtonClick}
      className={cn(
        'bg-[rgba(32,33,36,0.50)] rounded-[0.5rem] leading-[14px]',
        className
      )}
    ></Button>
  )
}
