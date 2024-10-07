'use client'

import { useSearchParams } from 'next/navigation'

import { useSetQueryString } from '@/shared/lib/hooks/useSetQueryString'
import { useFilterTypeStore } from '@/shared/lib/stores/useFilterTypeStore'
import { cn } from '@/shared/lib/utils'
import { Button } from '@/shared/ui'
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

interface CategoryItemProps {
  children: React.ReactNode
}
const CategoryItem = (props: CategoryItemProps) => {
  const searchParams = useSearchParams()
  const setFilterType = useFilterTypeStore((state) => state.setFilterType)

  const isHere =
    (searchParams.get('filterType') || 'ALL') ===
    props.children!.toString().toUpperCase()

  const { handleQueryString } = useSetQueryString({ action: 'replace' })
  const handleClickFilter = () => {
    handleQueryString([
      { filterType: props.children!.toString().toUpperCase() }
    ])
    setFilterType(props.children!.toString().toUpperCase())
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
