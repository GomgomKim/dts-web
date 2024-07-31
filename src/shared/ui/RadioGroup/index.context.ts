import { createContext, useContext } from 'react'

type RadioGroupContextState = {
  value: string
  onValueChange: (value: string) => void
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
