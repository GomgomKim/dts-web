'use client'
import { Signup } from '@/entities/Signup/Signup'
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
      signup modal ~~
      <Signup />
    </>
  )
}
