'use client'

import { ComponentProps } from 'react'

import { useRouter } from 'next/navigation'

import { cn } from '@/shared/lib/utils'

import Arrow from '/public/icons/arrow-thin.svg'

interface BackButtonProps extends ComponentProps<'button'> {}

export const BackButton = (props: BackButtonProps) => {
  const router = useRouter()

  return (
    <button
      onClick={() => router.back()}
      className={cn(
        'group flex items-center gap-[4px] rounded-none p-0 hover:bg-inherit',
        props.className
      )}
    >
      <Arrow className="rotate-[-135deg] stroke-neutral-5 group-hover:stroke-white" />
      <span className="w-8 text-[0.875rem] leading-[17px] text-neutral-5 group-hover:text-white">
        Back
      </span>
    </button>
  )
}
