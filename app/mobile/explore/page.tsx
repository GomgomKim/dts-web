'use client'

import AuthCheck from '@/app/providers/AuthCheck'

import { Instructions } from '@/entities/mobile/ui/Instructions'

import { useGetAuthToken } from '@/shared/lib/hooks/useGetAuthToken'

export default function Page() {
  useGetAuthToken({ redirectUri: 'explore' })

  return (
    <AuthCheck routePath="/mobile" isGettingToken={false}>
      <div className="absolute-center">
        <Instructions />
      </div>
    </AuthCheck>
  )
}
