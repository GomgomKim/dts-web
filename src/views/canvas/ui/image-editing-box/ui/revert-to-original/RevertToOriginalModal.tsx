import { useEyeContactsStore } from '@/views/canvas/model/useEditorPanelsStore'
import { useLayerVisibilityStore } from '@/views/canvas/model/useLayerVisibilityStore'

import { Button } from '@/shared/ui/button'
import { Modal } from '@/shared/ui/modal/Modal'

import DTSLogo from '/public/icons/dts-logo.svg'

import { useLayersStore } from '../image-view/lib/useLayersStore'
import { UI_TEXT } from './constants'

export const RevertToOriginalModal = () => {
  const resetStatus = useLayerVisibilityStore((state) => state.resetStatus)
  const setResetStatus = useLayerVisibilityStore(
    (state) => state.setResetStatus
  )
  const resetLayers = useLayersStore((state) => state.resetLayers)
  const resetSelectedItem = useEyeContactsStore(
    (state) => state.resetSelectedItem
  )
  return resetStatus ? (
    <Modal onCloseModal={() => setResetStatus(false)} className="min-w-[400px]">
      <div className="flex w-[320px] flex-col pb-4">
        {/* 상단 dtslogo svg 이미지 */}
        <DTSLogo />

        {/* 제목 텍스트 */}
        <h2 className="mt-[40px] text-[1.5rem] font-semibold text-white">
          {UI_TEXT.REVERT_TO_ORIGINAL_TITLE}
        </h2>

        {/* 서브텍스트 */}
        <p className="mt-3 text-[0.875rem] font-medium text-neutral-7">
          {UI_TEXT.REVERT_TO_ORIGINAL_SUBTEXT}
        </p>

        {/* Revert to Original */}
        <Button
          variant="primary"
          className="mt-8 flex h-[48px] w-[320px] bg-white px-4 py-3 hover:bg-white"
          onClick={() => {
            resetLayers()
            setResetStatus(false)
            resetSelectedItem()
          }}
        >
          {UI_TEXT.REVERT_BUTTON_TEXT}
        </Button>
        {/* Cancel */}
        <button
          type="button"
          className="mt-3 p-3 text-[0.875rem] text-white underline"
          onClick={() => setResetStatus(false)}
        >
          {UI_TEXT.REVERT_CANCEL_TEXT}
        </button>
      </div>
    </Modal>
  ) : null
}
