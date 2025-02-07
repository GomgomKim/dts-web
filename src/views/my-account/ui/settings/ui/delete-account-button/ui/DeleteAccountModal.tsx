import { Button } from '@/shared/ui'
import { DefaultModal } from '@/shared/ui/modal/DefaultModal'
import { ModalComponentProps } from '@/shared/ui/modal/model/types'

import { UI_TEXT } from '../../../model/constants'

interface DeleteAccountModalProps extends ModalComponentProps {}

export const DeleteAccountModal = (props: DeleteAccountModalProps) => {
  const { onCloseModal } = props

  return (
    <DefaultModal
      className="w-[400px]"
      closeable={{
        isCloseable: true,
        onClose: onCloseModal,
        withCancel: true
      }}
      withLogo
      title={UI_TEXT.DELETE_YOUR_ACCOUNT}
      description={
        <>
          {UI_TEXT.DELETE_ACCOUNT_DESCRIPTION_1}
          <br />
          {UI_TEXT.DELETE_ACCOUNT_DESCRIPTION_2}
        </>
      }
      footer={
        <Button
          variant="destructive"
          stretch
          onClick={() => alert('post delete account')}
        >
          Delete
        </Button>
      }
    />
  )
}
