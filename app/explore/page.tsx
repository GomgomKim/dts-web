'use client'

import Explore from '@/views/explore'

import { useGetAuthToken } from '@/shared/lib/hooks/useGetAuthToken'

export default function Page() {
  useGetAuthToken({ redirectPath: '/explore?filterType=ALL' })

  return <Explore />
}
