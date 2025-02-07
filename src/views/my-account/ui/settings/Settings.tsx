import { cn } from '@/shared/lib/utils'
import { Button } from '@/shared/ui'
import { Avatar } from '@/shared/ui/avatar'

import { UI_TEXT } from './model/constants'
import { DeleteAccountButton } from './ui/delete-account-button'
import { MarketingConsent } from './ui/marketing-consent'

const DUMMY_DATA = {
  name: 'GROWDLE',
  email: 'G8n6o@example.com'
}

export const Settings = () => {
  return (
    <div className="w-[560px]">
      <div
        className={cn(
          'px-5 pt-4',
          'relative mb-11 pb-[3.25rem] after:absolute after:bottom-0 after:left-0 after:w-full after:border-b after:border-neutral-2 after:content-[""]'
        )}
      >
        <h3 className="a11y-hidden">{UI_TEXT.ACCOUNT_DETAILS}</h3>
        <Avatar profileImageUrl="" className="size-16 bg-neutral-2" />
        <div className="mt-10">
          <p className="font-semibold text-neutral-4">{UI_TEXT.NAME}</p>
          <p className="mt-[10px] rounded-[0.5rem] bg-neutral-1/50 px-5 py-[15px] font-medium text-neutral-7">
            {DUMMY_DATA.name}
          </p>
        </div>
        <div className="mt-5">
          <p className="font-semibold text-neutral-4">{UI_TEXT.EMAIL}</p>
          <p className="mt-[10px] rounded-[0.5rem] bg-neutral-1/50 px-5 py-[15px] font-medium text-neutral-7">
            {DUMMY_DATA.email}
          </p>
          <p className="mt-[10px] font-medium text-neutral-7 [&_*]:text-[0.875rem]">
            {UI_TEXT.YOU_ARE_SIGNED_IN_AS_1}{' '}
            <span className="font-bold text-white">{DUMMY_DATA.email}</span>{' '}
            {UI_TEXT.YOU_ARE_SIGNED_IN_AS_2}{' '}
            <span className="font-bold text-white">{UI_TEXT.GOOGLE_SSO}</span>
          </p>
        </div>

        <div className="mt-[3.75rem] flex gap-3">
          <DeleteAccountButton />
          <Button variant="outline" stretch>
            {UI_TEXT.LOG_OUT}
          </Button>
        </div>
      </div>

      <div>
        <h3 className="mb-3">{UI_TEXT.NOTIFICATIONS}</h3>
        <MarketingConsent />
      </div>
    </div>
  )
}
