import { useEffect } from 'react'

export const useOnClickOutside = (
  ref: React.RefObject<HTMLElement>,
  handler: (event: Event) => void
) => {
  useEffect(() => {
    const listener = (event: Event) => {
      // ref가 할당되지 않았거나, 클릭 대상이 ref 내부에 있다면 아무 작업도 하지 않습니다.
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return
      }
      handler(event)
    }

    document.addEventListener('mousedown', listener)
    document.addEventListener('touchstart', listener)

    return () => {
      document.removeEventListener('mousedown', listener)
      document.removeEventListener('touchstart', listener)
    }
  }, [ref, handler])
}
