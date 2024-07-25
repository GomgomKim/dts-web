import * as React from 'react'
import { cn } from '@/sdcn/lib/utils'

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  disabled?: boolean
  children: React.ReactNode
}

const IconButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, disabled = false, children, ...props }, ref) => {
    return (
      <button
        className={cn(
          className,
          'w-10 h-10 rounded-lg bg-secondary flex justify-center items-center'
        )}
        disabled={disabled}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    )
  }
)
IconButton.displayName = 'IconButton'

export { IconButton }
