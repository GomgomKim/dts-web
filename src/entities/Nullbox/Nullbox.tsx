import Link from 'next/link'

import { Button } from '@/shared/ui/button'

export const Nullbox = () => {
  return (
    <div className="flex gap-5 relative w-[1240px]">
      {Array.from({ length: 5 }).map((_value, idx) => (
        <div
          key={idx}
          className="h-[400px] aspect-[9/16] rounded-[8px] bg-[#0f1011] bg-custom-180-gradient"
        ></div>
      ))}
      <div className="absolute-center flex flex-col gap-[24px] items-center">
        <p className="text-center text-neutral-5 text-[18px] font-medium leading-[1.2]">
          Go to the Explore page and click the heart icon
          <br />
          on models you like to add them to your favorites
        </p>
        <div>
          <Button variant="outline" asChild>
            <Link href="/explore">Go to Explore</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
