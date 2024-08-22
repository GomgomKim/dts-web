import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useEffect } from 'react'

type QueryParams = Record<string, string>

type useSetQueryStringParams = {
  queryParams: QueryParams[]
}

export const useSetQueryString = ({ queryParams }: useSetQueryStringParams) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const createQueryString = useCallback(
    (queryParams: QueryParams[]) => {
      const params = new URLSearchParams(searchParams.toString())
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
    [searchParams]
  )

  useEffect(() => {
    router.push(pathname + '?' + createQueryString(queryParams))
  }, [createQueryString, pathname, router, queryParams])
}
