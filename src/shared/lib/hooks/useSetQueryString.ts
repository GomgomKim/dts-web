import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useCallback } from 'react'

type QueryParams = Record<string, string>
type Optioin = 'push' | 'replace'

type Params = {
  option: Optioin
}

export const useSetQueryString = ({ option }: Params) => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()
  const params = new URLSearchParams(searchParams.toString())

  const createQueryStrings = useCallback(
    (queryParams: QueryParams[]) => {
      queryParams.forEach((param) => {
        Object.entries(param).forEach(([key, value]) => {
          if (value) {
            params.set(key, value)
          } else {
            params.delete(key)
          }
        })
      })
      return params.toString()
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [searchParams]
  )
  const handleQueryString = (queryParams: QueryParams[]) => {
    const queryString = createQueryStrings(queryParams)
    if (option === 'replace') {
      router.replace(pathname + '?' + queryString)
    } else {
      router.push(pathname + '?' + queryString)
    }
  }

  return { handleQueryString }
}
