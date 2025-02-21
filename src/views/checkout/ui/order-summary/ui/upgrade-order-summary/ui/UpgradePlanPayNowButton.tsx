'use client'

import { useRouter } from 'next/navigation'

import { throwIfNotAxiosError } from '@/shared/lib/utils/throwIfNotAxiosError'
import { Button } from '@/shared/ui'

import { AxiosError } from 'axios'

import { usePutSubscription } from '../model/adapter'

export const UpgradePlanPayNowButton = ({ planId }: { planId: number }) => {
  const router = useRouter()
  const updateSubscriptionMutation = usePutSubscription()

  const handleClickPayNow = async () => {
    if (!planId) {
      alert('no upgrade plan id')
    }

    try {
      await updateSubscriptionMutation.mutateAsync({ planId })
      // if (res?.statusText === 'OK') {
      router.replace('/my-account?tab=subscriptions')
      // }
    } catch (e) {
      if (e instanceof AxiosError) {
        throw new Error(e.message)
      }
      throwIfNotAxiosError(e)
    }
  }

  return (
    <Button
      className="bg-white hover:bg-white"
      stretch
      onClick={handleClickPayNow}
    >
      Pay Now
    </Button>
  )
}
