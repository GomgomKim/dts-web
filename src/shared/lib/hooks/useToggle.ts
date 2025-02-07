import { useCallback, useMemo, useState } from 'react'

const useToggle = (initialState: boolean) => {
  const [toggleState, setToggleState] = useState(initialState)

  const toggle = useCallback(() => setToggleState((prev) => !prev), [])
  const on = useCallback(() => setToggleState(true), [])
  const off = useCallback(() => setToggleState(false), [])
  const set = useCallback((value: boolean) => setToggleState(value), [])

  return useMemo(() => {
    return {
      state: toggleState,
      toggle,
      on,
      off,
      set
    }
  }, [toggleState])
}

export default useToggle
