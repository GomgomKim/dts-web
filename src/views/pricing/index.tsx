'use client'

import { useClientSearchParams } from '@/shared/lib/hooks/useClientSearchParams'
import { ErrorBoundary } from '@/shared/ui/error-boundary'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/ui/tabs/Tabs'

import { UI_TEXT } from './model/constants'
import { Credit } from './ui/credit'
import {
  NormalPaymentTossPaymentsTest,
  RecurringPaymentTossPaymentsTest
} from './ui/modals/subscription-modal/ui'
import { PaymentErrorModal } from './ui/modals/subscription-modal/ui/PaymentErrorModal'
import { PlanItems } from './ui/plan-Items'

const DEFAULT_TAB = 'plan'
type PricingTabs = 'plan' | 'credit'

export default function Pricing() {
  const { searchParams, addSearchParams } = useClientSearchParams({
    action: 'replace'
  })

  const currentTab = searchParams.get('tab') || DEFAULT_TAB

  const handleClickTab = (type: PricingTabs) => {
    addSearchParams({ tab: type })
  }

  const isPlanTab = currentTab === 'plan'

  return (
    <>
      <h1 className="m-auto mb-5 mt-12 text-center text-[2.5rem] font-semibold">
        {isPlanTab ? UI_TEXT.FIND_YOUR_IDEAL_PLAN : UI_TEXT.GET_MORE_CREDITS}
      </h1>
      <p className="mb-16 text-center text-[1.25rem] font-medium text-neutral-7">
        {isPlanTab ? UI_TEXT.PLAN_DESCRIPTION : UI_TEXT.CREDIT_DESCRIPTION}
      </p>
      <ErrorBoundary
        FallbackComponent={({ error }) => <PaymentErrorModal e={error} />}
      >
        <div className="flex gap-10">
          <NormalPaymentTossPaymentsTest />
          <RecurringPaymentTossPaymentsTest />
        </div>
      </ErrorBoundary>

      <Tabs
        value={currentTab}
        onValueChange={(value) => handleClickTab(value as PricingTabs)}
      >
        <TabsList className="m-auto mb-6 flex h-[48px] w-[300px] gap-0 rounded-[0.5rem] bg-neutral-2 p-1">
          <TabsTrigger
            value="plan"
            className="size-full rounded text-[1rem] font-medium text-neutral-5 data-[state=active]:bg-white data-[state=active]:font-semibold data-[state=active]:text-neutral-0"
          >
            {UI_TEXT.PLAN}
          </TabsTrigger>
          <TabsTrigger
            value="credit"
            className="size-full rounded text-[1rem] font-medium text-neutral-5 data-[state=active]:bg-white data-[state=active]:font-semibold data-[state=active]:text-neutral-0"
          >
            {UI_TEXT.CREDIT}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="plan">
          <div className="mb-40 px-20 lg:px-40">
            <PlanItems />
          </div>
        </TabsContent>
        <TabsContent value="credit">
          <Credit />
        </TabsContent>
      </Tabs>

      <div className="mb-40 px-20 lg:px-40">
        <PlanItems />
      </div>
    </>
  )
}

// interface TemporaryErrorModalProps extends ModalComponentProps {
//   error: Error | null
// }

// const TemporaryErrorModal = (props: TemporaryErrorModalProps) => {
//   return (
//     <DefaultModal title="error" description="TemporaryErrorModal" footer="">
//       {JSON.stringify(props.error)}
//     </DefaultModal>
//   )
// }
