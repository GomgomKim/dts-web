'use client'

import { ErrorModals } from '@/entities/error-modal'
import { Profile } from '@/entities/profile'

import { useAuthStore } from '@/shared/lib/stores/useAuthStore'
import { ErrorBoundary } from '@/shared/ui/error-boundary'
import { HeaderLayout } from '@/shared/ui/header-layout'

import { ExternalLinks, LoginSignupButtons } from './ui'

export const DefaultHeader = () => {
  const isAuth = useAuthStore((state) => state.isAuth)

  return (
    <HeaderLayout>
      <div className="ml-auto flex items-center">
        <nav className=" flex items-center text-[14px] text-secondary-foreground">
          <ul className="flex items-center">
            <ExternalLinks />
            {isAuth !== true ? <LoginSignupButtons /> : null}
          </ul>
        </nav>
        {isAuth === true ? (
          <ErrorBoundary FallbackComponent={ErrorModals}>
            <Profile />
          </ErrorBoundary>
        ) : null}
      </div>
    </HeaderLayout>
  )
}
