import { Card, CardFooter, CardHeader } from '@/shared/ui/card'

import DashedSvg from '/public/icons/dashed.svg'

interface EmptyCardItemProps {
  contents: React.ReactNode
  slot: React.ReactNode
}

export const EmptyCardItem = (props: EmptyCardItemProps) => {
  return (
    <Card className="flex min-h-[220px] flex-col md:min-h-[280px] lg:min-h-[304px]">
      <CardHeader className="grow p-5 lg:p-8 lg:pb-5">
        <div className="relative flex size-full items-center justify-center p-5">
          <DashedSvg className="absolute inset-0 size-full" />
          <span className="text-[0.875rem] text-neutral-5">
            {props.contents}
          </span>
        </div>
      </CardHeader>
      <CardFooter className="p-5 pt-0 lg:p-8 lg:pt-0">{props.slot}</CardFooter>
    </Card>
  )
}
