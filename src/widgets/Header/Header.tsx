'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useRouter } from 'next/navigation'

import { UserProfile } from '@/entities/UserProfile'
import { useAuthStore } from '@/entities/UserProfile/store'

import { cn } from '@/shared/lib/utils'
import { Button } from '@/shared/ui'

import Arrow from '/public/icons/arrow-thin.svg'
import CreditIcon from '/public/icons/database.svg'
import DTSLogo from '/public/icons/dts-logo.svg'

const Links = () => {
  return (
    <>
      <li>
        <Button asChild variant="link">
          <Link href="https://medium.com/do-things-with-ai" target="_blank">
            Medium
          </Link>
        </Button>
      </li>
      <li>
        <Button asChild variant="link">
          <Link
            href="https://www.instagram.com/dothings.studio/"
            target="_blank"
          >
            Instagram
          </Link>
        </Button>
      </li>
    </>
  )
}

const NotLoggedInNav = () => {
  return (
    <>
      <li>
        <Button asChild variant="link">
          <Link href="/login" scroll={false}>
            Log in
          </Link>
        </Button>
      </li>
      <li>
        <Button asChild className="rounded-full">
          <Link href="/signup" scroll={false}>
            Sign up
          </Link>
        </Button>
      </li>
    </>
  )
}

const UserInfo = () => {
  const restriction = useAuthStore((state) => state.restriction)

  const isZeroRestriction = restriction?.current === 100

  return (
    <div className="flex gap-3 items-center ml-3">
      <div className="flex gap-2 items-center px-3">
        <CreditIcon
          className={cn('stroke-white', {
            'stroke-[#FF8480]': isZeroRestriction
          })}
        />
        <span
          className={cn('text-[14px]', { 'text-[#FF8480]': isZeroRestriction })}
        >
          {restriction ? restriction?.max - restriction?.current : null}
        </span>
        {isZeroRestriction ? (
          <div className="font-[14px] text-[0.875rem] text-neutral-4">
            Credits reset at midnight
            <span className="ml-[8px]">🌙</span>
          </div>
        ) : null}
      </div>

      <UserProfile />
    </div>
  )
}

const BackButton = () => {
  const router = useRouter()

  return (
    <Button variant="ghost" onClick={() => router.back()} className="group">
      <div className="flex gap-[4px] items-center">
        <Arrow className="rotate-[-135deg] stroke-secondary-foreground group-hover:stroke-white" />
        <span className="text-[0.875rem]">back to explore</span>
      </div>
    </Button>
  )
}

export const Header = () => {
  const pathname = usePathname()
  const isAuth = useAuthStore((state) => state.isAuth)
  const isDetailPage = pathname.startsWith('/archive/')
  const isMainPage =
    pathname.startsWith('/explore') || pathname.startsWith('/favorites')

  return (
    <header className="fixed top-0 inset-0 z-40 h-14 py-[7.5px] px-5 bg-background">
      <div className="flex items-center gap-[0.5rem]">
        <Link href="/explore?filterType=ALL" className="mr-5">
          <DTSLogo />
        </Link>

        {isDetailPage ? <BackButton /> : null}
        <div className="flex items-center ml-auto">
          <nav className=" text-[14px] text-secondary-foreground flex items-center">
            <ul className="flex items-center">
              {isMainPage ? <Links /> : null}
              {isAuth !== true ? <NotLoggedInNav /> : null}
            </ul>
          </nav>
          {isAuth === true ? <UserInfo /> : null}
        </div>
      </div>
    </header>
  )
}
