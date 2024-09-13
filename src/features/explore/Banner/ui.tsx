import { useAuthStore } from '@/entities/user/store'
import { Button } from '@/shared/ui/button'
import { useRouter } from 'next/navigation'

interface Props {
  onClickSeeExample: () => void
}

export const Banner = (props: Props) => {
  const isAuth = useAuthStore((state) => state.isAuth)
  const router = useRouter()

  const handleClickStart = () => {
    if (isAuth) {
      props.onClickSeeExample()
      return
    }
    router.push('/signup')
  }

  return (
    <div className="flex flex-col gap-6 text-center mb-[0.5rem]">
      <div className="font-semibold text-[32px]">
        Create stunning virtual brand models effortlessly <br />
        with our advanced AI
      </div>
      <div className="text-medium text-neutral-5">
        Enhance your brands presence with lifelike, customizable models
        generated in seconds
      </div>
      <div className="flex gap-3 justify-center">
        {/* TODO: 로그인시 렌더링하지않기 */}
        <Button onClick={handleClickStart}>Get Started for Free</Button>
        <Button variant="outline" onClick={props.onClickSeeExample}>
          See Examples
        </Button>
      </div>
    </div>
  )
}
