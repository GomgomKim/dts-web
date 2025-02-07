import React from 'react'

import { cn } from '@/shared/lib/utils'

const LabeledDetail = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex flex-wrap justify-between gap-1', className)}
    {...props}
  />
))
LabeledDetail.displayName = 'LabeledDetail'

const LabeledDetailLabel = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('font-medium text-neutral-7', className)}
    {...props}
  />
))
LabeledDetailLabel.displayName = 'LabeledDetailLabel'

const LabeledDetailDetail = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('text-nowrap font-semibold', className)}
    {...props}
  />
))
LabeledDetailDetail.displayName = 'LabeledDetailDetail'

export { LabeledDetail, LabeledDetailLabel, LabeledDetailDetail }
