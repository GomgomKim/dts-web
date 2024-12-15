'use client'

import { Button } from '@/shared/ui'

import VectorIcon from '/public/icons/vector.svg'

export const NewGenerateButton = () => {
  // TODO: generate 페이지로 이동 및 variation 신규 생성

  return (
    <Button stretch>
      <VectorIcon />
      <span className="ml-2 mr-[2px] font-semibold">New Generate</span>
      <span className="text-[0.875rem] font-normal">(n Credit)</span>
    </Button>
  )
}
