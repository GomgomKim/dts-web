import { ReactElement } from 'react'
import { createPortal } from 'react-dom'

export const Portal = ({ children }: { children: ReactElement }) => {
  // const [mounted, setMounted] = useState<boolean>(false)

  // useEffect(() => {
  //   setMounted(true)
  //   return () => setMounted(false)
  // }, [])

  if (typeof window === 'undefined') return <></>

  return createPortal(
    children,
    document.getElementById('modal-root') as HTMLElement
  )
}
