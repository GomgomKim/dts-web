'use client'

import * as React from 'react'

import { Button } from '@/shared/ui'

import HamburgerIcon from '/public/icons/hamburger.svg'

export const HamburgerMenu = () => {
  const [isOpen, setIsOpen] = React.useState(false)
  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {isOpen ? 'x' : <HamburgerIcon />}
      </Button>
      {isOpen ? (
        <div className="fixed inset-0 top-14">
          <div className="absolute top-0 right-0 w-3/4 h-full z-[20] bg-background p-5 animate-sidebar-fadeIn">
            navbar
          </div>
        </div>
      ) : null}
    </>
  )
}
