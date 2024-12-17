import { cn } from '@/shared/lib/utils'

interface EyeContactsNameProps {
  name: string
  isSelected: boolean
}

export const EyeContactsName = (props: EyeContactsNameProps) => {
  return (
    <p
      className={cn(
        'relative m-auto min-h-[18px] w-fit text-center text-[0.75rem] text-neutral-5',
        'hidden lg:block',
        "after:absolute after:bottom-0 after:left-0 after:w-full after:border-b after:border-neutral-5 after:content-['']",
        {
          'after:border-white text-white': props.isSelected
        }
      )}
    >
      {props.name}
    </p>
  )
}
