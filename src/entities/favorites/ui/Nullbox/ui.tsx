import { Button } from '@/shared/ui/Button'
import Link from 'next/link'

export const Nullbox = () => {
  return (
    <div className="flex gap-5 relative w-[1240px]">
      {Array.from({ length: 5 }).map((_value, idx) => (
        <div
          key={idx}
          className="h-[400px] aspect-[9/16] rounded-[8px] bg-[#0f1011] bg-custom-180-gradient"
        ></div>
      ))}
      <div className="absolute-center flex flex-col gap-[1.5rem] items-center">
        <p className="text-center text-[#76777D] text-[1.125rem] font-medium leading-normal">
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
