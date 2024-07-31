import { Card } from '@/features/Card'
import { Nullbox } from '@/entities/favorites/ui/Nullbox'

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
        <Nullbox />
      )}
    </>
  )
}
export default Favorites
