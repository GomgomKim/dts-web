import Link from 'next/link'

import { ModalsProvider } from '@/app/providers/ModalsProvider'

import type { Meta, StoryObj } from '@storybook/react'

import { Button } from '../button'
import { DefaultModal } from './DefaultModal'
import useModals from './model/Modals.hooks'
import { ModalComponentProps } from './model/types'

const meta: Meta<typeof DefaultModal> = {
  component: DefaultModal,
  title: 'shared/DefaultModal',
  tags: ['autodocs'],
  argTypes: {},
  decorators: [
    (Story) => {
      return (
        <>
          <ModalsProvider>
            <Story />
          </ModalsProvider>
          <div id="modal-root" />
        </>
      )
    }
  ]
}
export default meta

type Story = StoryObj<typeof DefaultModal>

export const Default: Story = {
  render: () => {
    return (
      <DefaultModal
        title="modal title"
        description="modal description ..."
        footer="footer ..."
      />
    )
  }
}

export const WithLogo: Story = {
  render: () => {
    return (
      <DefaultModal
        withLogo={true}
        title="modal title"
        description="modal description ..."
        footer="footer ..."
      />
    )
  }
}

export const WithContents: Story = {
  render: () => {
    return (
      <DefaultModal
        withLogo={true}
        title="modal title"
        description="modal description ..."
        footer="footer ..."
      >
        modal contents ...
      </DefaultModal>
    )
  }
}

export const WithFooter: Story = {
  render: () => {
    return (
      <DefaultModal
        withLogo={true}
        title="modal title"
        description="modal description ..."
        footer={
          <>
            <Button
              size="small"
              stretch
              onClick={() => alert('this is the default modal')}
            >
              action button
            </Button>
            <div className="text-center">
              <Button
                variant="link"
                size="small"
                className="mt-3 text-white underline underline-offset-[3px]"
                asChild
              >
                <Link href="https://tally.so/r/314QEg" target="_blank">
                  Feedback
                </Link>
              </Button>
            </div>
          </>
        }
      >
        modal contents ...
      </DefaultModal>
    )
  }
}

interface CloseableModalProps extends ModalComponentProps {}

export const Closeable: Story = {
  render: () => {
    const { openModal } = useModals()

    const CloseableModal = (props: CloseableModalProps) => {
      const { onCloseModal } = props
      const handleClose = () => {
        onCloseModal()
      }

      return (
        <DefaultModal
          withLogo={true}
          closeable={{
            isCloseable: true,
            onClose: handleClose,
            withCancel: false
          }}
          title="modal title"
          description="modal description ..."
          footer={
            <Button size="small" stretch onClick={handleClose}>
              close
            </Button>
          }
        >
          modal contents ...
        </DefaultModal>
      )
    }

    const NonCloseableModal = (props: CloseableModalProps) => {
      const { onCloseModal } = props
      const handleClose = () => {
        onCloseModal()
      }

      return (
        <DefaultModal
          withLogo={true}
          closeable={{
            isCloseable: false,
            onClose: handleClose,
            withCancel: false
          }}
          title="modal title"
          description="modal description ..."
          footer={
            <Button size="small" stretch onClick={() => alert('action button')}>
              action button
            </Button>
          }
        >
          modal contents ...
        </DefaultModal>
      )
    }

    return (
      <>
        <Button
          onClick={(e) => {
            e.stopPropagation()
            openModal(CloseableModal)
          }}
        >
          Closeable Modal Open
        </Button>
        <Button
          variant="destructive"
          onClick={(e) => {
            e.stopPropagation()
            openModal(NonCloseableModal)
          }}
        >
          Non-Closeable Modal Open
        </Button>
      </>
    )
  }
}

export const CloseableWithCancel: Story = {
  render: () => {
    return (
      <DefaultModal
        withLogo={true}
        closeable={{
          isCloseable: true,
          onClose: () => alert('close modal'),
          withCancel: true
        }}
        title="modal title"
        description="modal description ..."
        footer={
          <Button
            size="small"
            stretch
            onClick={() => alert('this is the default modal')}
          >
            action button
          </Button>
        }
      >
        modal contents ...
      </DefaultModal>
    )
  }
}

interface SomethingModalProps extends ModalComponentProps {
  contents: React.ReactNode
}

export const OpenModalWithCustomProps: Story = {
  render: () => {
    const { openModal } = useModals()

    const SomethingModal = (props: SomethingModalProps) => {
      const { onCloseModal } = props
      const handleClose = () => {
        onCloseModal()
      }

      return (
        <DefaultModal
          withLogo={true}
          closeable={{
            isCloseable: true,
            onClose: handleClose,
            withCancel: true
          }}
          title="modal title"
          description="modal description ..."
          footer={
            <Button size="small" stretch onClick={handleClose}>
              close
            </Button>
          }
        >
          {props.contents}
        </DefaultModal>
      )
    }

    return (
      <>
        <Button
          onClick={(e) => {
            e.stopPropagation()
            openModal(SomethingModal, {
              contents: <div className="text-red-500">first modal contents</div>
            })
          }}
        >
          first modal
        </Button>
        <Button
          onClick={(e) => {
            e.stopPropagation()
            openModal(SomethingModal, {
              contents: (
                <div className="text-blue-500">second modal contents</div>
              )
            })
          }}
        >
          second modal
        </Button>
        {/* <Button
          onClick={() => {
            // MEMO: props는 선택적 필드임 인지 (props 속성의 개별적 타입 체크는 됨)
            openModal(SomethingModal, {
              contents: <div>third modal contents</div> // ex. SomethingModalProps의 contents 타입이 string인 경우 타입 에러 발생
              // ex. isCloseable: true // 정상 작동
            })
          }}
        >
          example modal
        </Button> */}
      </>
    )
  }
}
