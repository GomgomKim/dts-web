import { cn } from '@/shared/lib/utils'

interface BadgeProps extends React.ComponentProps<'span'> {
  children: React.ReactNode
}

export const Badge = ({ children, className, ...props }: BadgeProps) => {
  return (
    <span
      className={cn(
        'font-small rounded bg-[#393A40] px-2 py-[3px] text-center text-[12px] leading-4 text-[#D2D3D9]',
        className
      )}
      {...props}
    >
      {children}
    </span>
  )
}
