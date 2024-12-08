import type { ComponentType, SVGProps } from 'react'

interface CanvasNavIconProps {
  icon: ComponentType<SVGProps<SVGSVGElement>>
}

export const CanvasNavIcon = ({ icon: Icon }: CanvasNavIconProps) => {
  return (
    <div className="flex size-6 items-center justify-center">
      <Icon />
    </div>
  )
}
