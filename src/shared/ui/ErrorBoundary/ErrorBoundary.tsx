'use client'

import { Suspense } from 'react'

import { QueryErrorResetBoundary } from '@tanstack/react-query'

import ReactErrorBoundary from './ReactErrorBoundary'

type ReactErrorBoundaryProps = React.ComponentProps<typeof ReactErrorBoundary>

interface ErrorBoundaryProps extends Omit<ReactErrorBoundaryProps, 'onReset'> {}

export function ErrorBoundary(props: ErrorBoundaryProps) {
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ReactErrorBoundary
          FallbackComponent={props.FallbackComponent}
          onReset={reset} // 에러 발생 시 쿼리 재시도 설정
        >
          <Suspense>{props.children}</Suspense>
        </ReactErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  )
}
