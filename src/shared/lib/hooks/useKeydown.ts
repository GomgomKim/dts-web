import { useEffect } from 'react'

export const useKeydown = (callback: () => void) => {
  const handleKeydown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      callback()
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', handleKeydown)
    return () => {
      document.removeEventListener('keydown', handleKeydown)
    }
  }, [])
}
