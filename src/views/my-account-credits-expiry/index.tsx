import { UI_TEXT } from './model/constants'
import { CreditsExpiryTable } from './ui/CreditsExpiryTable'

export default function CreditsExpiry() {
  return (
    <>
      <div className="mb-12">
        <h1 className="mb-3 text-[2rem] font-semibold">
          {UI_TEXT.CREDIT_EXPIRY}
        </h1>
        <div className="text-[1.125rem] font-medium text-neutral-7">
          {UI_TEXT.EARLIEST_EXPIRATION_CREDITS_WILL_BE_USED_FIRST}
        </div>
      </div>
      <CreditsExpiryTable />
    </>
  )
}
