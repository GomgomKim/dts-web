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

interface TagTypeItemProps {
  children: React.ReactNode
}

const TagTypeItem = (props: TagTypeItemProps) => {
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

export const TagTypes = () => {
  return (
    <div>
      <MenuGroup
        title="Beauty"
        prefix={<Square color={'rgba(97, 97, 242, 1)'} />}
      >
        <TagTypeItem>Makeup</TagTypeItem>
        <TagTypeItem>Skincare</TagTypeItem>
        <TagTypeItem>Hair</TagTypeItem>
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
