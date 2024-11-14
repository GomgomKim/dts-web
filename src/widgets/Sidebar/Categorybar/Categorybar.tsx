'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'

import { cn } from '@/shared/lib/utils'
import { Button } from '@/shared/ui'
import { Badge } from '@/shared/ui/Badge'
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

interface CategoryItemProps {
  children: React.ReactNode
}
const CategoryItem = (props: CategoryItemProps) => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathName = usePathname()

  const isExplorePage = pathName.startsWith('/explore')

  const isHere =
    isExplorePage &&
    (searchParams.get('filterType') || 'ALL') ===
      props.children!.toString().toUpperCase()

  const handleClickFilter = () => {
    router.replace(
      `/explore?filterType=${props.children!.toString().toUpperCase()}`,
      { scroll: false }
    )
  }

  return (
    <Button
      variant="ghost"
      stretch
      className={cn('block text-left pl-12', { active: isHere })}
      onClick={handleClickFilter}
    >
      {props.children}
    </Button>
  )
}

export const Categorybar = () => {
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
        disabled
        title="Fashion"
        prefix={<Square color={'rgba(170, 74, 203, 1)'} />}
        postfix={<Badge>Upcoming</Badge>}
      >
        {/* ... */}
      </MenuGroup>
    </div>
  )
}
