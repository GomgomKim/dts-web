'use client'

import { useRouter } from 'next/navigation'

import { Button } from '@/shared/ui'

import Arrow from '/public/icons/arrow-thin.svg'

export const BackButton = () => {
  const router = useRouter()

  return (
    <Button
      variant="ghost"
      onClick={() => router.back()}
      className="group rounded-none p-0 hover:bg-inherit"
    >
      <div className="flex items-center gap-[4px]">
        <Arrow className="rotate-[-135deg] stroke-secondary-foreground group-hover:stroke-white" />
        <span className="text-[0.875rem]">Back</span>
      </div>
    </Button>
  )
}
