'use client'

import { Suspense } from 'react'
import { Banner } from '@/features/explore/Banner'
import { CardList } from '@/features/explore/CardList'
import { Category } from '@/features/category'
import { TAG_TYPES } from '../constant'
import { useRouter, useSearchParams } from 'next/navigation'
import { useAuthStore } from '@/entities/user/store'
import * as React from 'react'
import { dtsAxios } from '@/shared/api'

function Explore() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const logIn = useAuthStore((state) => state.logIn)
  const isAuth = useAuthStore((state) => state.isAuth)

  React.useEffect(() => {
    if (isAuth) return

    if (searchParams.has('oAuthProviderType') && searchParams.has('code')) {
      const getTokens = async () => {
        const response = await dtsAxios.get('/auth/access-token', {
          params: {
            oAuthProviderType: searchParams.get('oAuthProviderType'),
            code: searchParams.get('code')
          }
        })
        return response.headers
      }

      getTokens().then((headers) => {
        logIn({
          accessToken: headers['authorization'],
          refreshToken: headers['refresh-token']
        })
      })

      router.replace('/explore')
    } else {
      console.log('not logged in ')
    }
  }, [searchParams])

  return (
    <>
      <Banner />
      <Suspense fallback={<div>Loading...</div>}>
        <Category categoryList={TAG_TYPES} />
        <CardList />
      </Suspense>
    </>
  )
}
export default Explore
