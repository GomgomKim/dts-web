import { DefaultModal } from '@/shared/ui/modal/DefaultModal'
import { ModalComponentProps } from '@/shared/ui/modal/model/types'

interface PaymentErrorProps extends ModalComponentProps {
  e: Error | null
}
export const PaymentErrorModal = (props: PaymentErrorProps) => {
  const { onCloseModal } = props

  return (
    <DefaultModal
      withLogo
      closeable={{
        isCloseable: true,
        onClose: onCloseModal,
        withCancel: false
      }}
      title="Payment Error"
      description="Your payment couldn't be processed. Please check your payment details and try again."
      footer={
        <>
          <div>retry button</div>
          <div>Change Payment Method</div>
        </>
      }
    >
      {JSON.stringify(props.e)}
    </DefaultModal>
  )
}
