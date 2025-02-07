'use client'

import Link from 'next/link'

import { ErrorModals } from '@/entities/error-modal'
import { Profile } from '@/entities/profile'

import { useAuthStore } from '@/shared/lib/stores/useAuthStore'
import { Button } from '@/shared/ui'
import { ErrorBoundary } from '@/shared/ui/error-boundary'
import { HeaderLayout } from '@/shared/ui/header-layout'

import { UI_TEXT } from './model/constants'
import { ExternalLinks, SignInButton } from './ui'

export const DefaultHeader = () => {
  const isAuth = useAuthStore((state) => state.isAuth)

  return (
    <HeaderLayout>
      <div className="ml-auto flex items-center">
        <nav className=" flex items-center text-[14px] text-secondary-foreground">
          <ul className="flex items-center">
            {/* MEMO: 임시 페이지 이동 링크 */}
            <li>
              <Link href="/my-account">My Account</Link>
            </li>
            <li>
              <Link href="/canvas">Canvas</Link>
            </li>
            {/* end -------- MEMO: 임시 페이지 이동 링크 */}
            <li>
              <Button variant="link" asChild size="small" className="px-3">
                <Link href="pricing">{UI_TEXT.PRICING}</Link>
              </Button>
            </li>
            <ExternalLinks />
            {isAuth !== true ? <SignInButton /> : null}
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
