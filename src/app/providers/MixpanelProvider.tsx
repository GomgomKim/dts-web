'use client'

import { useEffect } from 'react'

import { track } from '@/shared/lib/utils/mixpanel'

interface MixpanelProviderProps {
  children: JSX.Element
}

export function MixpanelProvider({ children }: MixpanelProviderProps) {
  useEffect(() => {
    track.initialize()
  }, [])

  return children
}
