import { cn } from '@/shared/lib/utils'

interface BadgeProps extends React.ComponentProps<'span'> {
  children: React.ReactNode
}

const Badge = ({ children, className, ...props }: BadgeProps) => {
  return (
    <span
      className={cn(
        'px-2 py-[3px] rounded text-[#D2D3D9] bg-[#393A40] text-[12px] leading-4 font-small text-center',
        className
      )}
      {...props}
    >
      {children}
    </span>
  )
}

export { Badge }
