import { EmptyCard, EmptyInstruction } from './ui'

export const EmptyList = () => {
  return (
    <div className="relative m-auto">
      <EmptyCard />
      <EmptyInstruction />
    </div>
  )
}
