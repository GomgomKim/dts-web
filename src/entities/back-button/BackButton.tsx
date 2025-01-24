'use client'

import { useRouter } from 'next/navigation'

import Arrow from '/public/icons/arrow-thin.svg'

export const BackButton = () => {
  const router = useRouter()

  return (
    <button
      onClick={() => router.back()}
      className="group rounded-none p-0 hover:bg-inherit"
    >
      <div className="flex items-center gap-[4px]">
        <Arrow className="rotate-[-135deg] stroke-neutral-5 group-hover:stroke-white" />
        <span className="w-8 text-[0.875rem] leading-[17px] text-neutral-5 group-hover:text-white">
          Back
        </span>
      </div>
    </button>
  )
}
