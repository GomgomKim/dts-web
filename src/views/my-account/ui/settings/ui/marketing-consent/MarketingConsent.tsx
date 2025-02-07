'use client'

import { useState } from 'react'

import { Switch } from '@/shared/ui/switch'

import { UI_TEXT } from '../../model/constants'

export const MarketingConsent = () => {
  const [isMarketingConsent, setIsMarketingConsent] = useState<boolean>(true)

  return (
    <div className="flex items-center justify-between rounded-[0.5rem] bg-neutral-1/50 p-5">
      <span className="font-medium text-neutral-7">
        {UI_TEXT.MARKETING_INFORMATION_CONSENT}
      </span>
      <div className="flex items-center gap-2">
        <span className="text-[0.875rem] font-medium text-neutral-7">
          {isMarketingConsent
            ? UI_TEXT.AGREED_ON + ' ' + '2025. 01. 22'
            : UI_TEXT.NOT_AGREED}
        </span>
        <Switch
          checked={isMarketingConsent}
          onCheckedChange={(checked: boolean) => setIsMarketingConsent(checked)}
        />
      </div>
    </div>
  )
}
