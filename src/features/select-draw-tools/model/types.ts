// TODO: Brush와 SkinGlow 데이터 구조가 다르다면 상속 구조로 수정
export interface DrawTool {
  id: string
  text: string
}

export type DrawToolType = 'BRUSH' | 'SKIN_GLOW'
