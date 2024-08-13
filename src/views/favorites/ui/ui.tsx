import { Card } from '@/shared/ui/card'
import { Nullbox } from '@/entities/favorites/ui/Nullbox'

function Favorites() {
  const dummy = [
    {
      encodedBaseImageId: 'MQ==',
      name: 'modelname',
      description: 'model description'
    },
    {
      encodedBaseImageId: 'NQ==',
      name: 'modelname',
      description: 'model description'
    },
    {
      encodedBaseImageId: 'Nw==',
      name: 'modelname',
      description: 'model description'
    }
  ]
  return (
    <>
      <h1 className="text-xl mb-8 text-2xl font-semibold">Favorites</h1>
      {dummy.length > 0 ? (
        <div className="grid grid-cols-auto-fill-px gap-5">
          {dummy.map((item, idx) => (
            <Card key={idx} item={item}></Card>
          ))}
        </div>
      ) : (
        <Nullbox />
      )}
    </>
  )
}
export default Favorites
