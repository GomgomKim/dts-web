'use client'

import { useRouter } from 'next/navigation'

import { Button } from '@/shared/ui'

import Arrow from '/public/icons/arrow-thin.svg'

export const ExploreBackButton = () => {
  const router = useRouter()

  return (
    <Button
      variant="ghost"
      onClick={() => router.push('/explore?filterType=ALL')}
      className="group"
    >
      <div className="flex gap-[4px] items-center">
        <Arrow className="rotate-[-135deg] stroke-secondary-foreground group-hover:stroke-white" />
        <span className="text-[0.875rem]">Back to Explore</span>
      </div>
    </Button>
  )
}
