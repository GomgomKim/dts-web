import * as React from 'react'

export interface Box extends React.ComponentProps<'div'> {
  id: string
  createdAt: number
  image: string
  bottom: number
  left?: number
  width: number
  height: number
}
