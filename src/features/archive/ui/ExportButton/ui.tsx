import { useCallback } from 'react'
import { toPng } from 'html-to-image'
import { Button } from '@/sdcn/components/ui/Button'
import { cn } from '@/sdcn/lib/utils'

type ExportButtonProps = React.ComponentProps<typeof Button> & {
  containerRef: React.RefObject<HTMLElement>
}

export const ExportButton = ({
  containerRef,
  className,
  ...props
}: ExportButtonProps) => {
  const onButtonClick = useCallback(() => {
    console.log(containerRef.current)
    if (containerRef.current === null) return

    toPng(containerRef.current, { cacheBust: true })
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
      variant="outline"
      onClick={onButtonClick}
      className={cn('bg-[rgba(32,33,36,0.50)] rounded-[0.5rem]', className)}
      {...props}
    >
      Download
    </Button>
  )
}
