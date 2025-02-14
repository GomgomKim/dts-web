export interface LayersState {
  base: cv.Mat // 원본 모델 이미지
  skinGlow?: cv.Mat // 스킨 글로우 결과
  colorBrushs?: cv.Mat[] // 컬러 브러시는 여러 서브 레이어를 배열로 보관하고 내부에서 하나로 합성
  hairColor?: cv.Mat // 헤어 컬러 결과
  eyeContacts?: cv.Mat // 아이컨택츠 결과
}

/**
 * 최종 합성 이미지 생성 함수
 * 모든 레이어 겹치기
 */
export const composeFinalImage = (layers: LayersState) => {
  if (!layers.base) return null
  // 기본 레이어를 먼저 복제하여 최종 합성의 시작점으로 사용
  let finalMat = layers.base.clone()
  if (layers.skinGlow) {
    finalMat = overlayLayer(finalMat, layers.skinGlow)
  }
  if (layers.hairColor) {
    finalMat = overlayLayer(finalMat, layers.hairColor)
  }
  if (layers.eyeContacts) {
    finalMat = overlayLayer(finalMat, layers.eyeContacts)
  }
  if (layers.colorBrushs && layers.colorBrushs.length > 0) {
    layers.colorBrushs.forEach((brushMat) => {
      finalMat = overlayLayer(finalMat, brushMat)
    })
  }

  return finalMat
}

/**
 * 레이어 겹치기
 * @param baseMat 기본 레이어 (하위 레이어)
 * @param overlayMat 겹칠 상위 레이어
 * @returns 겹쳐진 결과 Mat
 */
const overlayLayer = (baseMat: cv.Mat, overlayMat: cv.Mat): cv.Mat => {
  // overlayMat의 알파 채널을 사용하여 baseMat에 겹침
  // 알파 채널이 없으면 전체를 덮어씌우도록 설정
  if (overlayMat.channels() === 4) {
    cv.cvtColor(overlayMat, overlayMat, cv.COLOR_RGBA2BGRA)
    cv.cvtColor(baseMat, baseMat, cv.COLOR_RGBA2BGRA)
    const mask = new cv.Mat()
    cv.extractChannel(overlayMat, mask, 3) // 알파 채널 추출
    overlayMat.copyTo(baseMat, mask)
    mask.delete()
  } else {
    overlayMat.copyTo(baseMat)
  }
  return baseMat
}
