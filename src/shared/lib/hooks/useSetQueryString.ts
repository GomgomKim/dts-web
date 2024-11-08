import { useCallback } from 'react'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'

type QueryParams = Record<string, string>
type Action = 'push' | 'replace'

interface useSetQueryStringParams {
  action: Action
  scroll?: boolean
}

export const useSetQueryString = (props: useSetQueryStringParams) => {
  const _searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = new URLSearchParams(_searchParams.toString())

  const createQueryStrings = useCallback(
    (queryParams: QueryParams[]) => {
      queryParams.forEach((param) => {
        Object.entries(param).forEach(([key, value]) => {
          if (value) {
            searchParams.set(key, value)
          }
        })
      })
      return searchParams.toString()
    },
    [_searchParams]
  )

  const handleQueryString = useCallback(
    (queryParams: QueryParams[]) => {
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
    },
    [pathname, _searchParams]
  )

  //  TODO: searchParams나 queryString 통일하기
  const removeSearchParams = useCallback(
    (keys: string | string[]) => {
      if (typeof keys === 'string') {
        searchParams.delete(keys)
      } else if (Array.isArray(keys)) {
        keys.forEach((key) => searchParams.delete(key))
      }

      const paramsToString = searchParams.toString()
      const query = paramsToString ? `?${paramsToString}` : ''

      router.replace(`${pathname}${query}`)
    },
    [pathname, _searchParams]
  )

  return { handleQueryString, removeSearchParams }
}
