'use client'

import { Badge } from '@/shared/ui/badge'
import { MenuGroup } from '@/shared/ui/menubar'

const Square = ({ color }: { color: string }) => {
  return (
    <div
      style={{
        width: '10px',
        height: '10px',
        backgroundColor: color,
        borderRadius: '2px'
      }}
    ></div>
  )
}

type CategoryItemProps = {
  children: React.ReactNode
}
const CategoryItem = (props: CategoryItemProps) => {
  return (
    <div className="p-4">
      <p className="ml-[36px] text-secondary-foreground">{props.children}</p>
    </div>
  )
}

const Categorybar = () => {
  return (
    <div>
      <MenuGroup
        title="Beauty"
        prefix={<Square color={'rgba(97, 97, 242, 1)'} />}
      >
        <CategoryItem>Makeup</CategoryItem>
        <CategoryItem>Skincare</CategoryItem>
        <CategoryItem>Hair</CategoryItem>
      </MenuGroup>

      <MenuGroup
        title="Fashion"
        prefix={<Square color={'rgba(170, 74, 203, 1)'} />}
        postfix={<Badge>Upcoming</Badge>}
      >
        {/* ... */}
      </MenuGroup>
    </div>
  )
}

export { Categorybar }
