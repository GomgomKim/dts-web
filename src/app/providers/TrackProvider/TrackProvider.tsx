'use client'

import * as React from 'react'

import { track } from './track'

interface TrackProviderProps {
  children: JSX.Element
}

export default function TrackProvider({ children }: TrackProviderProps) {
  React.useEffect(() => {
    track.initialize()
  }, [])

  return children
}
