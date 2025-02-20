import { UI_TEXT } from './model/constants'
import { CurrentSubscription, PaymentMethods } from './ui'

export default function ManageSubscription() {
  return (
    <>
      <h1 className="mb-12 text-[2rem] font-semibold">
        {UI_TEXT.MANAGE_SUBSCRIPTION}
      </h1>
      <div className="flex gap-6">
        <CurrentSubscription />
        <PaymentMethods />
      </div>
    </>
  )
}
