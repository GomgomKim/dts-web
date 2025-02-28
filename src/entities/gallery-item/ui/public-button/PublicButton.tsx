import { ComponentProps } from 'react'

import Link from 'next/link'

import { Button } from '@/shared/ui'

// import { track } from '@/shared/lib/utils/mixpanel'
import LinkIcon from '/public/icons/arrow-thin.svg'

import { UI_TEXT } from './model/constants'

interface PublicButtonProps extends ComponentProps<'button'> {
  modelName: string
  modelId: number
}

export const PublicButton = (props: PublicButtonProps) => {
  const handleClickButton = () => {
    console.log('send to mixpanel ...')
    // track.sendToMixpanel('select_model', {
    //   model_name: modelName,
    //   model_tag: tags.join(',')
    // })
  }

  return (
    <Button asChild variant="outline" size="small" className={props.className}>
      <Link
        href={`/login?name=${props.modelName}&id=${props.modelId}`}
        onClick={handleClickButton}
        scroll={false}
      >
        {UI_TEXT.TRY_WITH_THIS_MODEL}
        <LinkIcon className="stroke-white" />
      </Link>
    </Button>
  )
}
