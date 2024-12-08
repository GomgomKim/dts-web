'use client'

import { useRef, useState } from 'react'

import Link from 'next/link'

import { Instructions } from '@/entities/mobile/ui/Instructions'

import { useClickOutside } from '@/shared/lib/hooks/useClickOutside'
import { useAuthStore } from '@/shared/lib/stores/useAuthStore'
import { cn } from '@/shared/lib/utils'
import { Button } from '@/shared/ui'

import HamburgerIcon from '/public/icons/hamburger.svg'
import XIcon from '/public/icons/x.svg'

import { useQueryClient } from '@tanstack/react-query'

export const HamburgerMenu = () => {
  const queryClient = useQueryClient()

  const [isOpen, setIsOpen] = useState(false)
  const menubarRef = useRef<HTMLDivElement>(null)

  const isAuth = useAuthStore((state) => state.isAuth)
  const logOut = useAuthStore((state) => state.logOut)

  useClickOutside(menubarRef, () => setIsOpen(false))

  return (
    <div ref={menubarRef}>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {isOpen ? <XIcon /> : <HamburgerIcon />}
      </Button>
      <div
        className={cn(
          'fixed inset-0 top-14 z-30 h-[calc(100vh-64px)] bg-background transition-transform duration-300 ease-in-out',
          isOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        <div className="px-5 py-8">
          <Instructions />
        </div>
        <nav className="flex flex-col">
          <ul>
            <li>
              <Button
                asChild
                variant="link"
                className="py-[24px] text-[1.25rem]"
              >
                <Link
                  href="https://medium.com/do-things-with-ai"
                  target="_blank"
                >
                  Medium
                </Link>
              </Button>
            </li>
            <li>
              <Button
                asChild
                variant="link"
                className="py-[24px] text-[1.25rem]"
              >
                <Link
                  href="https://www.instagram.com/dothings.studio/"
                  target="_blank"
                >
                  Instagram
                </Link>
              </Button>
            </li>
            {isAuth ? (
              <li>
                <Button
                  variant="link"
                  className="py-[24px] text-[1.25rem]"
                  onClick={() => {
                    setIsOpen(false)
                    logOut(queryClient)
                  }}
                >
                  Log Out
                </Button>
              </li>
            ) : null}
          </ul>
        </nav>
      </div>
    </div>
  )
}
