import { forwardRef } from 'react'
import { Menubar } from '@/shared/ui/menubar'

export const Sidebar = () => {
  return (
    <div className="min-w-[280px] px-5 py-3">
      <Menubar />
      <SidebarSeparator />
      <div>categorybar...</div>
    </div>
  )
}

interface SidebarSeparatorProps extends React.ComponentProps<'div'> {}
export const SidebarSeparator = forwardRef<
  HTMLDivElement,
  SidebarSeparatorProps
>(({ ...props }, ref) => {
  return (
    <div ref={ref} className="my-3 border-b border-[#2D2E33]" {...props}></div>
  )
})
SidebarSeparator.displayName = 'SidebarSeparator'
