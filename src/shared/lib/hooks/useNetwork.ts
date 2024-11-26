import { useEffect, useState } from 'react'

export const useIsNetworkOffline = () => {
  const [isNetworkOffline, setIsNetworkOffline] = useState(false)

  useEffect(() => {
    const handleOnOffLine = () => {
      setIsNetworkOffline(() => !navigator.onLine)
    }

    window.addEventListener('online', handleOnOffLine)
    window.addEventListener('offline', handleOnOffLine)

    return () => {
      window.removeEventListener('online', handleOnOffLine)
      window.removeEventListener('offline', handleOnOffLine)
    }
  }, [])

  return isNetworkOffline
}
