'use client'

import { DropdownMenuItem } from '@/shared/ui/dropdown-menu'

import { useQueryClient } from '@tanstack/react-query'

import { useAuthStore } from '../store'

export const LogOut = () => {
  const queryClient = useQueryClient()

  const logOut = useAuthStore((state) => state.logOut)

  const handleClickLogout = () => {
    logOut(queryClient)
  }
  return (
    <DropdownMenuItem onClick={handleClickLogout}>Log out</DropdownMenuItem>
  )
}
