'use client'

import { Button } from '@/shared/ui'

import EditorIcon from '/public/icons/editor.svg'

export const EditWithAIToolButton = () => {
  // TODO: 해당 모델 canvas 페이지로 이동

  return (
    <Button variant="outline" stretch className="mb-3" size="small">
      <EditorIcon className="mr-2" />
      <span>Edit with AI Tools</span>
    </Button>
  )
}
