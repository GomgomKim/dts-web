'use client'

import { ComponentProps } from 'react'

import { usePathname, useSearchParams } from 'next/navigation'

import { Badge } from '@/shared/ui/badge'
import { Menu, MenuGroup, MenuItem } from '@/shared/ui/menu'

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

// TODO: partial보다 좋은 방법 찾기
interface TagTypeItemProps extends Partial<ComponentProps<typeof MenuItem>> {
  children: string
}

const TagTypeItem = (props: TagTypeItemProps) => {
  const pathName = usePathname()
  const searchParams = useSearchParams()

  const tagType = props.children.toString()

  const isExplorePage = pathName.startsWith('/explore')
  const isActive =
    isExplorePage &&
    (searchParams.get('tagType') || 'ALL') === tagType.toUpperCase()

  return (
    <MenuItem
      href={{
        pathname: '/explore',
        query: { tagType: tagType.toUpperCase() }
      }}
      title={tagType}
      isActive={isActive}
      replace={true}
      scroll={false}
      disabled={props.disabled ?? false}
    />
  )
}

export const TagTypes = () => {
  return (
    <Menu>
      <li>
        <MenuGroup
          title="Beauty"
          prefix={<Square color={'rgba(97, 97, 242, 1)'} />}
        >
          <TagTypeItem>Makeup</TagTypeItem>
          <TagTypeItem>Skincare</TagTypeItem>
          <TagTypeItem>Hair</TagTypeItem>
        </MenuGroup>
      </li>
      <li>
        <MenuGroup
          disabled
          title="Fashion"
          prefix={<Square color={'rgba(170, 74, 203, 1)'} />}
          postfix={<Badge>Upcoming</Badge>}
        >
          {/* ... */}
        </MenuGroup>
      </li>
    </Menu>
  )
}
