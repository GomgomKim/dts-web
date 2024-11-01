'use client'

import React from 'react'

import { cn } from '@/shared/lib/utils'

import { RadioGroupContext } from './index.context'

interface RadioGroupProps extends React.ComponentProps<'div'> {
  id: string
  value: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onChangeValue: (value: any) => void
  disabled?: boolean
}
const RadioGroup = React.forwardRef<HTMLDivElement, RadioGroupProps>(
  (
    { id, value, onChangeValue, className, disabled = false, ...props },
    ref
  ) => {
    const contextValue = {
      id,
      value,
      onChange: onChangeValue,
      disabled
    }

    return (
      <RadioGroupContext.Provider value={contextValue}>
        <div
          className={cn('flex gap-2', className)}
          {...props}
          ref={ref}
          role="radiogroup"
        />
      </RadioGroupContext.Provider>
    )
  }
)
RadioGroup.displayName = 'RadioGroup'

interface RadioGroupItemProps extends React.ComponentProps<'div'> {
  value: string
  label: string
}
const RadioGroupItem = React.forwardRef<HTMLDivElement, RadioGroupItemProps>(
  ({ value: localValue, label, className, ...props }, ref) => {
    const { value, onChange, disabled } = React.useContext(RadioGroupContext)!

    const handleKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
      if (disabled) return

      if (
        e.target instanceof HTMLElement &&
        e.target.getAttribute('role') === 'radio'
      ) {
        if (e.key === ' ' || e.key === 'Enter') {
          e.preventDefault()
          onChange(localValue)
        }
      }
    }

    return (
      <div
        ref={ref}
        role="radio"
        tabIndex={disabled ? -1 : 0}
        aria-checked={value === localValue}
        aria-disabled={disabled}
        className={cn(
          'p-3 flex items-center justify-center flex-1 text-[0.875rem] rounded-[0.5rem] bg-inherit text-neutral-7 border border-neutral-1 focus:outline-none focus-visible:border-white focus-visible:border-1 focus-visible:ring-2 focus-visible:ring-ring 2xl:h-[66px]',
          className,
          {
            'bg-neutral-1 text-white': value === localValue,
            'cursor-pointer hover:bg-neutral-1 hover:text-white': !disabled,
            'opacity-50': disabled
          }
        )}
        onClick={() => {
          if (disabled) return
          onChange(localValue)
        }}
        onKeyDown={handleKeyDown}
        {...props}
      >
        <label
          className={cn('text-[0.875rem] 2xl:text-[1.25rem]', {
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
