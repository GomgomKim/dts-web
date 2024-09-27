'use client'

import * as React from 'react'

import { Button } from '@/shared/ui'

import HamburgerIcon from '/public/icons/hamburger.svg'

export const HamburgerMenu = () => {
  const [isOpen, setIsOpen] = React.useState(false)
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setIsOpen((prev) => !prev)}
    >
      {isOpen ? 'x' : <HamburgerIcon />}
    </Button>
  )
}
