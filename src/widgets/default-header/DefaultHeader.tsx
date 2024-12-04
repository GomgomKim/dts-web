'use client'

import { ErrorModals } from '@/entities/error-modal'
import { useAuthStore } from '@/entities/user-profile/model/store'

import { ErrorBoundary } from '@/shared/ui/error-boundary'
import { HeaderLayout } from '@/shared/ui/header-layout'

import { ExternalLinks, LoginSignupButtons, UserProfileSummary } from './ui'

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
            <UserProfileSummary />
          </ErrorBoundary>
        ) : null}
      </div>
    </HeaderLayout>
  )
}
