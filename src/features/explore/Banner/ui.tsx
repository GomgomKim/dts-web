import { Button } from '@/shared/ui/button'

const Banner = () => {
  return (
    <div className="flex flex-col gap-6 text-center ">
      <div className="font-semibold text-[32px]">
        Create stunning virtual brand models effortlessly <br />
        with our advanced AI
      </div>
      <div className="text-medium text-neutral-5">
        Enhance your brands presence with lifelike, customizable models
        generated in seconds
      </div>
      <div className="flex gap-3 justify-center">
        {/* TODO: add event */}
        <Button>Get Started for Free</Button>
        <Button variant="outline">See Examples</Button>
      </div>
    </div>
  )
}

export { Banner }
