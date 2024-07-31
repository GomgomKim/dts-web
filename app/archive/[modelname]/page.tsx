import Model from '@/views/model/ui'

export default function Page({ params }: { params: { modelname: string } }) {
  const { modelname } = params

  return <Model modelName={modelname} />
}
