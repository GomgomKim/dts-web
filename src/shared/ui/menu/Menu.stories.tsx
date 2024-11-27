import type { Meta, StoryObj } from '@storybook/react'

import { Menu, MenuGroup, MenuItem } from '.'
import { Badge } from '../badge'

const meta: Meta<typeof Menu> = {
  component: Menu,
  title: 'shared/Menu',
  tags: ['autodocs'],
  argTypes: {}
}
export default meta

type Story = StoryObj<typeof Menu>

export const WithMenuItem: Story = {
  render: () => {
    return (
      <Menu className="w-[400px]">
        <MenuItem
          href={{ pathname: '#' }}
          title="menu item 1"
          isActive={false}
        />
        <MenuItem
          href={{ pathname: '#' }}
          title="menu item 2 - active"
          isActive={true}
        />
        <MenuItem
          href={{ pathname: '#' }}
          title="menu item 3 - disabled"
          isActive={false}
          disabled
        />
      </Menu>
    )
  }
}

export const WithMenuGroup: Story = {
  render: () => {
    return (
      <Menu className="w-[400px]">
        <li>
          <MenuGroup title="Group 1" prefix={'1️⃣'}>
            <MenuItem
              href={{ pathname: '#' }}
              title="menu 1-1"
              isActive={false}
            />
            <MenuItem
              href={{ pathname: '#' }}
              title="menu 1-2"
              isActive={false}
            />
          </MenuGroup>
        </li>
        <li>
          <MenuGroup title="Group 2 - disabled" prefix={'2️⃣'} disabled>
            <MenuItem
              href={{ pathname: '#' }}
              title="menu 2-1"
              isActive={false}
            />
            <MenuItem
              href={{ pathname: '#' }}
              title="menu 2-2"
              isActive={false}
            />
          </MenuGroup>
        </li>
      </Menu>
    )
  }
}

export const WithPrefix: Story = {
  render: () => {
    return (
      <Menu className="w-[400px]">
        <li>
          <MenuGroup title="Group 1" prefix={'1️⃣'}>
            <MenuItem
              href={{ pathname: '#' }}
              title="menu 1-1"
              prefix="👉"
              isActive={false}
            />
            <MenuItem
              href={{ pathname: '#' }}
              title="menu 1-2"
              prefix="👉"
              isActive={false}
            />
          </MenuGroup>
        </li>
        <li>
          <MenuGroup title="Group 2 - disabled" prefix={'2️⃣'} disabled>
            <MenuItem
              href={{ pathname: '#' }}
              title="menu 2-1"
              prefix="👉"
              isActive={false}
            />
            <MenuItem
              href={{ pathname: '#' }}
              title="menu 2-2"
              prefix="👉"
              isActive={false}
            />
          </MenuGroup>
        </li>
      </Menu>
    )
  }
}

export const WithPostfix: Story = {
  render: () => {
    return (
      <Menu className="w-[400px]">
        <li>
          <MenuGroup title="Group 1" prefix={'1️⃣'}>
            <MenuItem
              href={{ pathname: '#' }}
              title="menu 1-1"
              postfix="👉"
              isActive={false}
            />
            <MenuItem
              href={{ pathname: '#' }}
              title="menu 1-2"
              postfix={<Badge>Upcoming</Badge>}
              isActive={false}
            />
          </MenuGroup>
        </li>
        <li>
          <MenuGroup title="Group 2" prefix={'2️⃣'} disabled>
            <MenuItem
              href={{ pathname: '#' }}
              title="menu 2-1"
              postfix="👉"
              isActive={false}
            />
            <MenuItem
              href={{ pathname: '#' }}
              title="menu 2-2"
              postfix="👉"
              isActive={false}
            />
          </MenuGroup>
        </li>
      </Menu>
    )
  }
}
