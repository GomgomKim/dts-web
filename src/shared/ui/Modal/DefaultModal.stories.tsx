import { ModalsProvider } from '@/app/providers/ModalsProvider'

import type { Meta, StoryObj } from '@storybook/react'

import { Button } from '../Button'
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

/* 1. Default
 * 모달 UI만 사용하고 싶을 때
 */
export const Default: Story = {
  render: () => {
    return (
      <DefaultModal
        title="default modal"
        description="description"
        slot={
          <Button stretch onClick={() => alert('this is the default modal')}>
            button
          </Button>
        }
      />
    )
  }
}

/* 2. WithEvent
 * 이벤트에 따라 모달을 제어(open, close)하고 싶을 때,
 * ModalComponentProps를 이용해 모달 UI 컴포넌트를 만들고,
 * 사용하는 곳에서 useModals를 이용합니다.
 */
interface ModalProps extends ModalComponentProps {}

const CloseableModal = (props: ModalProps) => {
  const { onCloseModal, isCloseable } = props

  return (
    <DefaultModal
      closeable={{
        isCloseable: isCloseable ?? false,
        onClose: onCloseModal
      }}
      title="this is closeable modal"
      description="closeable modal description"
      slot={
        <Button
          onClick={() => {
            if (confirm('close this modal?')) {
              onCloseModal()
            }
          }}
        >
          close modal
        </Button>
      }
    />
  )
}

const SomethingModal = (props: ModalProps) => {
  const { onCloseModal, onClickSlot, isCloseable } = props

  return (
    <DefaultModal
      closeable={{
        isCloseable: isCloseable,
        onClose: onCloseModal
      }}
      title="this is something modal"
      description="something modal description"
      slot={
        <Button
          stretch
          onClick={() => {
            onClickSlot()
            onCloseModal()
          }}
        >
          button
        </Button>
      }
    />
  )
}

export const WithEvent: Story = {
  render: () => {
    const { openModal } = useModals()

    return (
      <>
        <Button
          onClick={(e) => {
            e.stopPropagation()
            openModal(CloseableModal, { isCloseable: true })
          }}
        >
          Closeable Modal Open
        </Button>
        <Button
          variant="destructive"
          onClick={(e) => {
            e.stopPropagation()
            openModal(CloseableModal)
          }}
        >
          Non-Closeable Modal Open
        </Button>
        <Button
          variant="secondary"
          onClick={(e) => {
            e.stopPropagation()
            openModal(SomethingModal, {
              isCloseable: true,
              onClickSlot: () => alert('event injection modal clicked')
            })
          }}
        >
          Event Injection Modal
        </Button>
      </>
    )
  }
}
