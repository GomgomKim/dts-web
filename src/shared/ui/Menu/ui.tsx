import { Children, cloneElement, forwardRef, isValidElement } from 'react'

import Link, { LinkProps } from 'next/link'

import { cn } from '@/shared/lib/utils'
import { Button } from '@/shared/ui/Button'

// menu

interface MenuProps extends React.ComponentProps<'ul'> {}

export const Menu = forwardRef<HTMLUListElement, MenuProps>(
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
          className={cn('flex items-center justify-between !px-[12px]', {
            'pointer-events-none opacity-50': props.disabled
          })}
        >
          <div className="flex items-center justify-center gap-5">
            <span className="flex size-4 items-center justify-center [&>svg]:stroke-current">
              {props.prefix}
            </span>
            <span className="h-4 text-[0.875rem]">{props.title}</span>
          </div>
          {props.postfix ? (
            <span className="flex h-4 items-center justify-center">
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
export const MenuGroup = forwardRef<HTMLUListElement, MenuGroupProps>(
  (
    { title, prefix, postfix, children, disabled = false, ...props },
    ref: React.Ref<HTMLUListElement>
  ) => {
    const renderChildrenWithDisabled = () => {
      return Children.map(children, (child) => {
        if (isValidElement<Partial<{ disabled: boolean }>>(child)) {
          return cloneElement(child, {
            disabled
            // className: `disabled ? 'pointer-events-none opacity-50' : ''`
          })
        }
        return child
      })
    }

    return (
      <ul ref={ref} className="text-[14px]" {...props} role="group">
        <div className="flex items-center justify-between rounded-lg p-3 text-[#aeafb5]">
          <div
            className={cn('flex items-center justify-center gap-5', {
              'pointer-events-none opacity-50': disabled
            })}
          >
            <span className="flex size-4 items-center justify-center gap-5">
              {prefix}
            </span>
            <span className="h-4 text-[0.875rem]">{title}</span>
          </div>
          {postfix ? (
            <span className="relative flex h-4 items-center justify-center">
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
