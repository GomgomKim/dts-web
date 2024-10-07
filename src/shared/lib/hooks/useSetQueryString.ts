import { useCallback } from 'react'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'

type QueryParams = Record<string, string>
type Action = 'push' | 'replace'

interface useSetQueryStringParams {
  action: Action
  scroll?: boolean
}

export const useSetQueryString = (props: useSetQueryStringParams) => {
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
    [searchParams]
  )

  const handleQueryString = (queryParams: QueryParams[]) => {
    const queryString = createQueryStrings(queryParams)
    if (props.action === 'replace') {
      router.replace(pathname + '?' + queryString, {
        scroll: props.scroll || false
      })
    } else {
      router.push(pathname + '?' + queryString, {
        scroll: props.scroll || false
      })
    }
  }

  return { handleQueryString }
}
