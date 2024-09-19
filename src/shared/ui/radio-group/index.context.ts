import { createContext, useContext } from 'react'

interface RadioGroupContextState {
  id: string
  value: string
  onChange: (value: string) => void
  disabled: boolean
}

export const RadioGroupContext = createContext<RadioGroupContextState | null>(
  null
)

export const useRadioGroupContext = () => {
  const context = useContext(RadioGroupContext)
  if (!context) {
    throw new Error('RadioGroupContext must be used within a RadioGroup')
  }
  return context
}
