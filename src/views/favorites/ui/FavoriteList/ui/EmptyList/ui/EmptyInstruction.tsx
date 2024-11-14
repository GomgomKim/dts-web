import Link from 'next/link'

import { Button } from '@/shared/ui/Button'

export const EmptyInstruction = () => {
  return (
    <div
      className="absolute-center flex flex-col gap-[24px] items-center"
      style={{ top: '178px' }}
    >
      <p className="text-center text-neutral-5 text-[18px] font-medium leading-[1.2] text-nowrap">
        Go to the Explore page and click the heart icon
        <br />
        on models you like to add them to your favorites
      </p>
      <div>
        <Button variant="sub1" asChild>
          <Link href="/explore">Go to Explore</Link>
        </Button>
      </div>
    </div>
  )
}
