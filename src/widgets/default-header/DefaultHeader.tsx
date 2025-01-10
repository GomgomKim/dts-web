'use client'

import Link from 'next/link'

import { ErrorModals } from '@/entities/error-modal'
import { Profile } from '@/entities/profile'

import { useAuthStore } from '@/shared/lib/stores/useAuthStore'
import { Button } from '@/shared/ui'
import { ErrorBoundary } from '@/shared/ui/error-boundary'
import { HeaderLayout } from '@/shared/ui/header-layout'

import { UI_TEXT } from './model/constants'
import { ExternalLinks, LoginSignupButtons } from './ui'

export const DefaultHeader = () => {
  const isAuth = useAuthStore((state) => state.isAuth)

  return (
    <HeaderLayout>
      <div className="ml-auto flex items-center">
        <nav className=" flex items-center text-[14px] text-secondary-foreground">
          <ul className="flex items-center">
            <li>
              <Button variant="link" asChild>
                <Link href="pricing">{UI_TEXT.PRICING}</Link>
              </Button>
            </li>
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
