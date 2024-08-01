import { cn } from '@/sdcn/lib/utils'
import React from 'react'
import { RadioGroupContext } from './index.context'

type RadioGroupProps = React.ComponentProps<'div'> & {
  id: string
  value: string
  onValueChange: (id: string, value: string) => void
}
const RadioGroup = React.forwardRef<HTMLDivElement, RadioGroupProps>(
  ({ id, value, onValueChange, className, ...props }, ref) => {
    const contextValue = {
      id,
      value,
      onChange: (newValue: string) => onValueChange(id, newValue)
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
    const { value, onChange } = React.useContext(RadioGroupContext)!

    return (
      <div
        ref={ref}
        role="radio"
        aria-checked={value === localValue}
        className={cn(
          'p-3 rounded-[0.5rem] bg-inherit text-neutral-7 border border-neutral-1 cursor-pointer flex items-center justify-center flex-1',
          className,
          {
            'bg-neutral-1 text-white': value === localValue
          }
        )}
        onClick={() => onChange(localValue)}
        {...props}
      >
        <label className="cursor-pointer">{label}</label>
      </div>
    )
  }
)
RadioGroupItem.displayName = 'RadioGroupItem'

export { RadioGroup, RadioGroupItem }
