export const MAX_CUSTOM_BRUSHES = 6
// 커스텀 브러시 시작 세그먼트 값
export const CUSTOM_BRUSH_START = 254
export interface Brush {
  id: string
  text: string
  segments?: number[]
}

export const createCustomBrush = (index: number): Brush => ({
  id: `brush_${index}`,
  text: `Brush ${index}`,
  // 254, 253, 252, 251, 250, 249
  segments: [CUSTOM_BRUSH_START - (index - 1)]
})

export const SEGMENT_MAP = {
  EYEBROWS_LEFT: 7,
  EYEBROWS_RIGHT: 6,
  NOSE: 2,
  EYE_LEFT: 5,
  EYE_RIGHT: 4,
  CHEEK_LEFT: 22,
  CHEEK_RIGHT: 21,
  LIP_UPPER: 11,
  LIP_LOWER: 12,
  NECK: 17,
  CLOTH: 18,
  HAIR: 13
}

export const DUMMY_DATA: Brush[] = [
  {
    id: 'lip',
    text: 'Lip',
    segments: [SEGMENT_MAP.LIP_LOWER, SEGMENT_MAP.LIP_UPPER]
  },
  {
    id: 'eyebrows',
    text: 'Eyebrows',
    segments: [SEGMENT_MAP.EYEBROWS_LEFT, SEGMENT_MAP.EYEBROWS_RIGHT]
  }
]
