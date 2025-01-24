import { BackButton } from '@/entities/back-button'

import { UI_TEXT } from './model/constants'
import { CurrentSubscription, PaymentMethods } from './ui'

export default function ManageSubscription() {
  return (
    <>
      <BackButton />
      <h1 className="mb-12 mt-5 text-[2rem] font-semibold">
        {UI_TEXT.MANAGE_SUBSCRIPTION}
      </h1>
      <div className="flex gap-6">
        <CurrentSubscription />
        <PaymentMethods />
      </div>
    </>
  )
}
