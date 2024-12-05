import { forwardRef } from 'react'

import { cn } from '@/shared/lib/utils'

import { Slot } from '@radix-ui/react-slot'
import { type VariantProps, cva } from 'class-variance-authority'

export const buttonVariants = cva(
  'group leading-[1.2] text-[0.875rem] inline-flex items-center justify-center whitespace-nowrap rounded-[100px] font-normal ring-offset-background focus-visible:outline-none focus-visible:border focus-visible:border-white focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-0 disabled:pointer-events-none',
  {
    variants: {
      variant: {
        primary:
          'bg-primary text-primary-foreground hover:bg-primary-hover disabled:bg-neutral-2 disabled:text-neutral-4',
        outline:
          'border border-solid border-border bg-neutral-2 bg-opacity-50 text-secondary-foreground hover:bg-neutral-2 hover:text-neutral-7 disabled:border-neutral-2 disabled:text-neutral-3',
        sub: 'border border-solid border-neutral-1 bg-background text-secondary-foreground hover:bg-neutral-1 hover:text-white rounded-[8px] disabled:text-neutral-3',
        destructive:
          'bg-destructive text-destructive-foreground hover:bg-destructive-hover',
        secondary:
          'bg-secondary text-secondary-foreground hover:bg-secondary/80 rounded-[8px]',
        ghost: 'text-secondary-foreground hover:text-white hover:bg-secondary',
        link: 'text-secondary-foreground underline-offset-4 hover:underline'
      },
      size: {
        small: 'py-3 px-5',
        medium: 'py-4 px-5',
        large: 'py-5 px-8',
        icon: 'h-10 w-10'
      }
    },
    defaultVariants: {
      variant: 'primary',
      size: 'medium'
    }
  }
)

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  stretch?: boolean
  disabled?: boolean
  isActive?: boolean
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      stretch = false,
      disabled = false,
      isActive = false,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp
        className={cn(
          buttonVariants({ variant, size }),
          {
            'w-full': stretch,
            'text-white bg-secondary': variant === 'ghost' && isActive
          },
          className
        )}
        disabled={disabled}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = 'Button'
