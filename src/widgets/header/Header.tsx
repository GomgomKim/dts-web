'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { ErrorModals } from '@/entities/error-modal'
import { useAuthStore } from '@/entities/user-profile/model/store'

import { ErrorBoundary } from '@/shared/ui/error-boundary'

import DTSLogo from '/public/icons/dts-logo.svg'

import {
  ExploreBackButton,
  ExternalLinks,
  LoginSignupButtons,
  UserProfileSummary
} from './ui'

export const Header = () => {
  const pathname = usePathname()
  const isAuth = useAuthStore((state) => state.isAuth)

  const isGeneratePage = pathname.startsWith('/generate/')
  const isMainPage =
    pathname.startsWith('/explore') || pathname.startsWith('/favorites')

  return (
    <header className="fixed inset-0 z-40 h-14 bg-background px-5 py-[7.5px]">
      <div className="flex items-center gap-2">
        <Link href="/explore?filterType=ALL" className="mr-5">
          <DTSLogo />
        </Link>

        {isGeneratePage ? <ExploreBackButton /> : null}
        <div className="ml-auto flex items-center">
          <nav className=" flex items-center text-[14px] text-secondary-foreground">
            <ul className="flex items-center">
              {isMainPage ? <ExternalLinks /> : null}
              {isAuth !== true ? <LoginSignupButtons /> : null}
            </ul>
          </nav>
          {isAuth === true ? (
            <ErrorBoundary FallbackComponent={ErrorModals}>
              <UserProfileSummary />
            </ErrorBoundary>
          ) : null}
        </div>
      </div>
    </header>
  )
}
