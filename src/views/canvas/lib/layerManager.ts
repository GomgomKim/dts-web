// layerManager.ts
import { compositeLayers } from './layerCompositor'

// 각 효과별 레이어를 하나의 상태 객체로 관리
export interface LayersState {
  base: cv.Mat // 원본 모델 이미지
  skinGlow?: cv.Mat // 스킨 글로우 결과
  // 컬러 브러시는 8개의 서브 레이어를 배열로 보관하고 내부에서 하나로 합성
  colorBrushLayers?: cv.Mat[]
  hairColor?: cv.Mat // 헤어 컬러 결과
  eyeContacts?: cv.Mat // 아이컨택츠 결과
}

/**
 * 최종 합성 이미지 생성 함수
 * 합성 순서는 (base) < 스킨 글로우 < (컬러브러시 복합) < 헤어 컬러 < 아이컨택츠
 */
export const composeFinalImage = (layers: LayersState): cv.Mat => {
  const layerList = []
  // 기본 레이어 (order 0)
  layerList.push({ name: 'base', order: 0, mat: layers.base })

  // 아이컨택츠 (order 1)
  if (layers.eyeContacts) {
    layerList.push({ name: 'eyeContacts', order: 1, mat: layers.eyeContacts })
  }

  // 스킨 글로우 (order 2)
  if (layers.skinGlow) {
    layerList.push({ name: 'skinGlow', order: 2, mat: layers.skinGlow })
  }

  // 헤어 컬러 (order 3)
  if (layers.hairColor) {
    layerList.push({ name: 'hairColor', order: 3, mat: layers.hairColor })
  }

  // 컬러 브러시: 8개의 서브 레이어가 있다면 먼저 내부에서 합성한 후 order 2 로 추가
  if (layers.colorBrushLayers && layers.colorBrushLayers.length > 0) {
    // 단순히 서브 레이어 순서대로 합성 (서로 겹치는 영역은 알파 블렌딩)
    let colorBrushComposite = layers.colorBrushLayers[0].clone()
    for (let i = 1; i < layers.colorBrushLayers.length; i++) {
      const blended = compositeLayers([
        { name: 'brush', order: 0, mat: colorBrushComposite },
        { name: 'brush', order: 1, mat: layers.colorBrushLayers[i] }
      ])
      colorBrushComposite.delete()
      colorBrushComposite = blended
    }
    layerList.push({ name: 'colorBrush', order: 2, mat: colorBrushComposite })
  }

  // 최종 합성
  return compositeLayers(layerList)
}
