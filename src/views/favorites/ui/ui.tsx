import { Card } from '@/features/explore/ui/Card'
import { Button } from '@/sdcn/components/ui/Button'

import BG1 from '/public/images/model-gen-1.png'

function Favorites() {
  const dummy = [
    { imgUrl: BG1, id: 'modelname' },
    { imgUrl: BG1, id: 'modelname' },
    { imgUrl: BG1, id: 'modelname' },
    { imgUrl: BG1, id: 'modelname' },
    { imgUrl: BG1, id: 'modelname' }
  ]
  return (
    <>
      <h1 className="text-xl mb-8 text-2xl font-semibold">Favorites</h1>
      {dummy.length > 0 ? (
        <div className="grid grid-cols-auto-fill-px gap-5">
          {dummy.map((item) => (
            <Card imgUrl={item.imgUrl} id={item.id} key={item.id}></Card>
          ))}
        </div>
      ) : (
        <div className="flex gap-5 relative w-[1240px]">
          {Array.from({ length: 5 }).map((_value, idx) => (
            <div
              key={idx}
              className="h-[400px] aspect-[9/16] rounded-[8px] bg-[#0f1011] bg-custom-180-gradient"
            ></div>
          ))}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 flex flex-col gap-[1.5rem] items-center">
            <p className="text-center text-[#76777D] text-[1.125rem] font-medium leading-normal">
              Go to the Explore page and click the heart icon
              <br />
              on models you like to add them to your favorites
            </p>
            <div>
              <Button variant="outline">Go to Explore</Button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
export default Favorites
