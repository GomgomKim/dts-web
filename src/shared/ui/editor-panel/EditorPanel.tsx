import { ComponentProps } from 'react'

import { cn } from '@/shared/lib/utils'

interface EditorPanelProps extends Omit<ComponentProps<'article'>, 'title'> {
  title: React.ReactNode
}

export const EditorPanel = (props: EditorPanelProps) => {
  return (
    <article
      className={cn(
        'flex max-h-screen w-[340px] flex-col gap-3 overflow-hidden rounded-[0.5rem] bg-neutral-1 p-5 lg:w-[400px]',
        props.className
      )}
    >
      <h3 className="text-[1.125rem] font-bold">{props.title}</h3>
      {props.children}
    </article>
  )
}
