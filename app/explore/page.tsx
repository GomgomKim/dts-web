import Explore from '@/views/explore'
import { Banner } from '@/views/explore/ui/banner'

export default function Page() {
  return (
    <>
      <h1 className="a11y-hidden">Explore</h1>
      <Banner />
      <Explore />
    </>
  )
}
