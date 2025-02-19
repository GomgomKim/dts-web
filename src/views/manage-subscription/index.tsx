'use client'

import { ErrorBoundary } from '@/shared/ui/error-boundary'

import { UI_TEXT } from './model/constants'
import { CurrentSubscription, PaymentMethods } from './ui'

export default function ManageSubscription() {
  return (
    <>
      <h1 className="mb-12 text-[2rem] font-semibold">
        {UI_TEXT.MANAGE_SUBSCRIPTION}
      </h1>
      <div className="flex gap-6">
        {/* TODO: error ui 처리 어떻게 할지 */}
        <ErrorBoundary FallbackComponent={({ error }) => <>{error?.message}</>}>
          <CurrentSubscription />
          <PaymentMethods />
        </ErrorBoundary>
      </div>
    </>
  )
}
