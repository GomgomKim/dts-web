'use client'

import * as React from 'react'

import Generate from '@/views/generate'

export default function Page() {
  React.useLayoutEffect(() => {
    const setVh = () => {
      document.documentElement.style.setProperty(
        '--vh',
        `${window.innerHeight * 0.01}px`
      )
    }
    setVh()

    window.addEventListener('resize', setVh)
    return () => window.removeEventListener('resize', setVh)
  }, [])

  return <Generate />
}
