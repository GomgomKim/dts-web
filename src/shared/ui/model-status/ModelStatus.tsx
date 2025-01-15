import { cn } from '@/shared/lib/utils'

export const ModelStatus = ({ isActive }: { isActive: boolean }) => {
  return (
    <div className="flex w-fit items-center rounded-full bg-neutral-0/80 px-3 py-2">
      <span
        className={cn(
          'mr-[7px] inline-block size-[10px] rounded-full',
          isActive ? 'bg-primary' : 'bg-neutral-7'
        )}
      />
      <span
        className={cn(
          'text-[0.75rem]',
          isActive ? 'text-primary' : 'text-neutral-7'
        )}
      >
        {isActive ? 'ACTIVE' : 'INACTIVE'}
      </span>
    </div>
  )
}
