import { useCallback } from 'react'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'

type QueryParams = Record<string, string>
type Action = 'push' | 'replace'

interface useClientSearchParamsParams {
  action: Action
  scroll?: boolean
}

export const useClientSearchParams = (props: useClientSearchParamsParams) => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()
  const newSearchParams = new URLSearchParams(searchParams.toString())

  const createQueryStrings = (queryParams: QueryParams) => {
    Object.entries(queryParams).forEach(([key, value]) => {
      if (value) {
        newSearchParams.set(key, value)
      }
    })

    return newSearchParams.toString()
  }

  const addSearchParams = useCallback(
    (queryParams: QueryParams) => {
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
    [pathname, router]
  )

  const removeSearchParams = useCallback(
    (keys: string | string[]) => {
      if (typeof keys === 'string') {
        newSearchParams.delete(keys)
      } else if (Array.isArray(keys)) {
        keys.forEach((key) => newSearchParams.delete(key))
      }

      const paramsToString = newSearchParams.toString()
      const query = paramsToString ? `?${paramsToString}` : ''

      router.replace(`${pathname}${query}`)
    },
    [pathname, router]
  )

  return { searchParams, addSearchParams, removeSearchParams }
}
