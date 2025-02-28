import { create } from 'zustand'

import { useLayersStore } from '../ui/image-editing-box/ui/image-view/lib/useLayersStore'

// 투명한 이미지 (각 레이어의 0번째 배열에 들어갈 시작 단계)
export const PLACEHOLDER_BASE64 =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQI12P4//8/AwAI/AL+FKAA7AAAAABJRU5ErkJggg=='

export type GlobalHistoryEntry = {
  layer: string
  base64: string
  mat?: cv.Mat | null
  globalIndex: number
  cursorPos?: { x: number; y: number }
}

interface GlobalHistoryState {
  globalHistory: GlobalHistoryEntry[]
  currentIndex: number
  addEntry: (
    layer: string,
    base64: string,
    mat?: cv.Mat | null,
    cursorPos?: { x: number; y: number }
  ) => void
  undo: () => void
  redo: () => void
}

// 미리 정의된 non-brush 레이어에 대한 복원 함수 (없으면 브러시로 처리됨)
const restoreFunctions: Record<string, (base64: string) => void> = {
  eyeContact: (base64: string) =>
    useLayersStore.getState().setEyeContactsData(base64),
  skinGlow: (base64: string) =>
    useLayersStore.getState().setSkinGlowLayer(base64),
  hairColor: (base64: string) =>
    useLayersStore.getState().setHairColorLayer(base64)
}

// 모든 레이어를 통합 복원하는 함수
const restoreGlobalState = (targetIndex: number) => {
  const { globalHistory } = useGlobalHistoryStore.getState()
  const layerSet = new Set<string>()
  globalHistory.forEach((entry) => {
    if (entry.globalIndex <= targetIndex) {
      layerSet.add(entry.layer)
    }
  })
  // 각 레이어별 최신 기록 복원
  layerSet.forEach((layer) => {
    const entries = globalHistory.filter(
      (entry) => entry.layer === layer && entry.globalIndex <= targetIndex
    )
    const base64 =
      entries.length > 0
        ? entries[entries.length - 1].base64
        : PLACEHOLDER_BASE64

    // 미리 정의된 복원 함수가 있으면 사용, 없으면 ColorBrushView용 복원 함수로 인식
    const restoreFn =
      restoreFunctions[layer] ||
      ((base64: string) =>
        useLayersStore.getState().setColorBrushLayers(layer, base64))
    restoreFn(base64)
  })
}

export const useGlobalHistoryStore = create<GlobalHistoryState>((set, get) => ({
  globalHistory: [],
  currentIndex: -1,
  addEntry: (layer, base64, mat, cursorPos) => {
    // 현재 활성 상태의 history (undo한 이후의 redo 부분은 제외)
    const activeHistory = get().globalHistory.slice(0, get().currentIndex + 1)
    const updatedHistory = [...activeHistory]

    // 만약 activeHistory에 해당 layer의 기록이 없다면, 기본 entry를 먼저 추가(초기 상태용)
    if (!activeHistory.some((entry) => entry.layer === layer)) {
      const placeholderEntry: GlobalHistoryEntry = {
        layer,
        base64: PLACEHOLDER_BASE64,
        mat: null,
        globalIndex: updatedHistory.length
      }
      updatedHistory.push(placeholderEntry)
    }

    // 전달받은 base64나 mat 값이 없다면 기본값(placeholder / null)을 사용
    const newEntry: GlobalHistoryEntry = {
      layer,
      base64: base64 ? base64 : PLACEHOLDER_BASE64,
      mat: mat ? mat : null,
      globalIndex: updatedHistory.length,
      cursorPos
    }
    updatedHistory.push(newEntry)
    set({
      globalHistory: updatedHistory,
      currentIndex: updatedHistory.length - 1
    })
  },
  undo: () => {
    const currentIndex = get().currentIndex
    if (currentIndex > 0) {
      const newIndex = currentIndex - 1
      set({ currentIndex: newIndex })
      restoreGlobalState(newIndex)
    }
  },
  redo: () => {
    const currentIndex = get().currentIndex
    const globalHistory = get().globalHistory
    if (currentIndex < globalHistory.length - 1) {
      const newIndex = currentIndex + 1
      set({ currentIndex: newIndex })
      restoreGlobalState(newIndex)
    }
  }
}))
