'use client'

import useModals from '@/shared/ui/modal/model/Modals.hooks'

import { DATA } from './model/DATA'
import { useGenerativeItemStore } from './model/useGenerativeItemStore'
import { GenerativeItemViewModal } from './ui/GenerativeItemViewModal'

export const Generatives = () => {
  const { openModal, closeModal } = useModals()
  const setIndex = useGenerativeItemStore((state) => state.setIndex)

  return (
    <div id="generatives-items" className="relative h-full">
      {DATA.map((item, index) => (
        <button
          key={item.id}
          onClick={() => {
            setIndex(index)
            openModal(GenerativeItemViewModal, {
              onClose: () => closeModal(GenerativeItemViewModal)
            })
          }}
          className="aspect-square w-[120px] bg-neutral-2"
        >
          item {item.id}
        </button>
      ))}
    </div>
  )
}
