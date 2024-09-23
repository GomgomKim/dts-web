import { Properties } from '@/shared/api/types'
import { createStore } from '@/shared/lib/zustand'

type EditItem = {
  past: Properties[] // 또는 편집 내용에 맞는 타입
  present: Properties // 현재 편집된 내용
  future: Properties[]
}

type EditState = {
  items: Map<string, EditItem> // Map 객체를 사용하여 아이템 관리
}

type EditorAction = {
  setInitialProperty: (variationId: string, properties: Properties) => void // 초기 속성 설정
  applyEdit: (variationId: string, newEdit: Properties) => void // 새로운 편집 적용
  undo: (variationId: string) => void // undo 기능
  redo: (variationId: string) => void // redo 기능
}

export const useEditorStore = createStore<EditState & EditorAction>(
  'edit history store',
  (set) => ({
    items: new Map(),
    setInitialProperty: (variationId, properties) =>
      set((state) => {
        const newItem: EditItem = {
          past: [],
          present: properties,
          future: []
        }

        const newItems = new Map(state.items)
        newItems.set(variationId, newItem)

        return {
          items: newItems
        }
      }),
    applyEdit: (variationId, newEdit) =>
      set((state) => {
        const currentEditItem = state.items.get(variationId)

        const newItem: EditItem = {
          past: [
            ...(currentEditItem?.past || []),
            ...(currentEditItem?.present ? [currentEditItem.present] : [])
          ],
          present: newEdit,
          future: []
        }

        const newItems = new Map(state.items)
        newItems.set(variationId, newItem)

        return {
          items: newItems
        }
      }),
    undo: (variationId) =>
      set((state) => {
        const currentEditItem = state.items.get(variationId)
        if (!currentEditItem || !currentEditItem.past.length) return state

        const previous = currentEditItem.past[currentEditItem.past.length - 1]
        const newPast = currentEditItem.past.slice(0, -1)

        const newItem: EditItem = {
          past: newPast,
          present: previous,
          future: [currentEditItem.present, ...currentEditItem.future]
        }

        const newItems = new Map(state.items)
        newItems.set(variationId, newItem)

        return {
          items: newItems
        }
      }),
    redo: (variationId) =>
      set((state) => {
        const currentEditItem = state.items.get(variationId)
        if (!currentEditItem || !currentEditItem.future.length) return state

        const next = currentEditItem.future[0]
        const newFuture = currentEditItem.future.slice(1)

        const newItem: EditItem = {
          past: [...currentEditItem.past, currentEditItem.present],
          present: next,
          future: newFuture
        }

        const newItems = new Map(state.items)
        newItems.set(variationId, newItem)

        return {
          items: newItems
        }
      })
  })
)
