'use client'

import { Login } from '@/entities/Login/Login'
import { useEffect } from 'react'

export default function Page() {
  useEffect(() => {
    document.body.style.overflowY = 'hidden'
    return () => {
      document.body.style.overflowY = 'auto'
    }
  }, [])
  return (
    <>
      login modal ~~
      <Login />
    </>
  )
}
