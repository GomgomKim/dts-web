'use client'

import * as React from 'react'

import { track } from '@/shared/lib/utils/mixpanel'

interface MixpanelProviderProps {
  children: JSX.Element
}

export function MixpanelProvider({ children }: MixpanelProviderProps) {
  React.useEffect(() => {
    track.initialize()
  }, [])

  return children
}
