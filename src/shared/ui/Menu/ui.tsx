import { ComponentProps } from 'react'
import * as React from 'react'

import Link, { LinkProps } from 'next/link'

import { cn } from '@/shared/lib/utils'
import { Button } from '@/shared/ui/Button'

// menu

interface MenuProps extends ComponentProps<'ul'> {}

export const Menu = React.forwardRef<HTMLUListElement, MenuProps>(
  ({ ...props }, ref: React.Ref<HTMLUListElement>) => {
    return <ul ref={ref} {...props}></ul>
  }
)
Menu.displayName = 'Menu'

// menu item

interface MenuItemProps extends LinkProps {
  disabled?: boolean
  target?: string
  title: string
  prefix?: React.ReactNode
  postfix?: React.ReactNode
  isActive: boolean
}

export const MenuItem = (props: MenuItemProps) => {
  return (
    <li>
      <Button
        asChild
        variant="ghost"
        stretch
        disabled={props.disabled}
        className={cn('h-10', {
          active: props.isActive
        })}
      >
        <Link
          href={props.href}
          target={props.target}
          replace={props.replace ?? false}
          scroll={props.scroll ?? true}
          aria-disabled={props.disabled}
          className={cn('flex justify-between items-center !px-[12px]', {
            'pointer-events-none opacity-50': props.disabled
          })}
        >
          <div className="flex justify-center items-center gap-5">
            <span className="[&>svg]:stroke-current flex justify-center items-center w-4 h-4">
              {props.prefix}
            </span>
            <span className="text-[0.875rem] h-4">{props.title}</span>
          </div>
          {props.postfix ? (
            <span className="flex justify-center items-center h-4">
              {props.postfix}
            </span>
          ) : null}
        </Link>
      </Button>
    </li>
  )
}

//  menu group

interface MenuGroupProps extends Omit<React.ComponentProps<'ul'>, 'prefix'> {
  title: string
  prefix: React.ReactNode
  postfix?: React.ReactNode
  children?: React.ReactNode
  disabled?: boolean
}

// TODO: SubMenuGroup
export const MenuGroup = React.forwardRef<HTMLUListElement, MenuGroupProps>(
  (
    { title, prefix, postfix, children, disabled = false, ...props },
    ref: React.Ref<HTMLUListElement>
  ) => {
    const renderChildrenWithDisabled = () => {
      return React.Children.map(children, (child) => {
        if (React.isValidElement<Partial<{ disabled: boolean }>>(child)) {
          return React.cloneElement(child, {
            disabled
            // className: `disabled ? 'pointer-events-none opacity-50' : ''`
          })
        }
        return child
      })
    }

    return (
      <ul ref={ref} className="text-[14px]" {...props} role="group">
        <div className="flex justify-between items-center p-3 rounded-lg text-[#aeafb5]">
          <div
            className={cn('flex justify-center items-center gap-5', {
              'pointer-events-none opacity-50': disabled
            })}
          >
            <span className="flex justify-center items-center gap-5 w-4 h-4">
              {prefix}
            </span>
            <span className="text-[0.875rem] h-4">{title}</span>
          </div>
          {postfix ? (
            <span className="flex justify-center items-center h-4 relative">
              {postfix}
            </span>
          ) : null}
        </div>

        {renderChildrenWithDisabled()}
      </ul>
    )
  }
)
MenuGroup.displayName = 'MenuGroup'
