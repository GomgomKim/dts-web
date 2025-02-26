import { ComponentProps } from 'react'

import Link from 'next/link'

import { Button } from '@/shared/ui'

import LinkIcon from '/public/icons/arrow-thin.svg'

import { PrivateButton } from '../PrivateButton'
import { UI_TEXT } from '../model/constants'

type PrivateButtonProps = ComponentProps<typeof PrivateButton>

interface SelectWithThisModelButtonProps extends PrivateButtonProps {}

export const SelectWithThisModelButton = (
  props: SelectWithThisModelButtonProps
) => {
  const handleClickButton = () => {
    console.log('send to mixpanel ...')
    // track.sendToMixpanel('select_model', {
    //   model_name: modelName,
    //   model_tag: tags.join(',')
    // })
  }

  return (
    <Button asChild variant="outline" size="small" {...props}>
      <Link
        href={`/generate/${props.modelName}?id=${props.modelId}`}
        onClick={handleClickButton}
      >
        {UI_TEXT.SELECT_THIS_MODEL}
        <LinkIcon className="stroke-white" />
      </Link>
    </Button>
  )
}
