'use client'

import { cn } from '@/shared/lib/utils'
import React from 'react'
import { RadioGroupContext } from './index.context'

type RadioGroupProps = React.ComponentProps<'div'> & {
  id: string
  value: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onValueChange: (value: any) => void
  disabled?: boolean
}
const RadioGroup = React.forwardRef<HTMLDivElement, RadioGroupProps>(
  (
    { id, value, onValueChange, className, disabled = false, ...props },
    ref
  ) => {
    const contextValue = {
      id,
      value,
      onChange: onValueChange,
      disabled
    }

    return (
      <RadioGroupContext.Provider value={contextValue}>
        <div className={cn('flex gap-2', className)} {...props} ref={ref} />
      </RadioGroupContext.Provider>
    )
  }
)
RadioGroup.displayName = 'RadioGroup'

type RadioGroupItemProps = React.ComponentProps<'div'> & {
  value: string
  label: string
}
const RadioGroupItem = React.forwardRef<HTMLDivElement, RadioGroupItemProps>(
  ({ value: localValue, label, className, ...props }, ref) => {
    const { value, onChange, disabled } = React.useContext(RadioGroupContext)!

    return (
      <div
        ref={ref}
        role="radio"
        aria-checked={value === localValue}
        aria-disabled={disabled}
        className={cn(
          'p-3 rounded-[0.5rem] bg-inherit text-neutral-7 border border-neutral-1 flex items-center justify-center flex-1 text-[14px]',
          className,
          {
            'bg-neutral-1 text-white': value === localValue,
            'cursor-pointer': !disabled,
            'opacity-50': disabled
          }
        )}
        onClick={() => onChange(localValue)}
        {...props}
      >
        <label
          className={cn('text-[0.875rem]', {
            'cursor-pointer': !disabled,
            'opacity-50': disabled
          })}
        >
          {label}
        </label>
      </div>
    )
  }
)
RadioGroupItem.displayName = 'RadioGroupItem'

export { RadioGroup, RadioGroupItem }
