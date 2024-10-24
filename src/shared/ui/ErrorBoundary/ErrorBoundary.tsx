import { Suspense } from 'react'

// import { ErrorBoundary as ReactErrorBoundary } from 'react-error-boundary'
import { QueryErrorResetBoundary } from '@tanstack/react-query'

import ReactErrorBoundary from './ReactErrorBoundary'

type ReactErrorBoundaryProps = React.ComponentProps<typeof ReactErrorBoundary>

interface ErrorBoundaryProps extends Omit<ReactErrorBoundaryProps, 'onReset'> {}

export function ErrorBoundary(props: ErrorBoundaryProps) {
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        // <ReactErrorBoundary
        //   onReset={reset}
        //   fallbackRender={({ resetErrorBoundary }) => (
        //     <div>
        //       There was an error!
        //       <Button onClick={() => resetErrorBoundary()}>Try again</Button>
        //     </div>
        //   )}
        // >
        //   <>{props.children}</>
        // </ReactErrorBoundary>
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
