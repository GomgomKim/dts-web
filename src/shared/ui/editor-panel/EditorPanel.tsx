import { ComponentProps } from 'react'

import { cn } from '@/shared/lib/utils'

interface EditorPanelProps extends Omit<ComponentProps<'article'>, 'title'> {
  title: React.ReactNode
  postfix?: React.ReactNode
}

export const EditorPanel = (props: EditorPanelProps) => {
  return (
    <article
      className={cn(
        'flex max-h-[calc(100vh-56px-20px-48px-40px)] w-[340px] flex-col gap-3 overflow-hidden rounded-[0.5rem] bg-neutral-1 p-5 lg:w-[400px]',
        props.className
      )}
    >
      <div className="flex items-center justify-between">
        <h3 className="text-[1.125rem] font-bold">{props.title}</h3>
        {props.postfix}
      </div>
      {props.children}
    </article>
  )
}
