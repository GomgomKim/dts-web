export interface Layer {
  name: string
  order: number // 낮을수록 아래, 높을수록 위
  mat: cv.Mat
}

/**
 * 두 레이어(top, bottom)를 알파 블렌딩하여 결과를 반환
 * 알파 값은 [0,255]로 가정하며, 간단한 per-pixel 계산을 수행합니다.
 */
const alphaBlend = (top: cv.Mat, bottom: cv.Mat): cv.Mat => {
  const rows = bottom.rows
  const cols = bottom.cols
  const output = new cv.Mat(rows, cols, cv.CV_8UC4)
  const totalPixels = rows * cols

  for (let i = 0; i < totalPixels; i++) {
    const idx = i * 4
    const tR = top.data[idx]
    const tG = top.data[idx + 1]
    const tB = top.data[idx + 2]
    const tA = top.data[idx + 3] / 255
    const bR = bottom.data[idx]
    const bG = bottom.data[idx + 1]
    const bB = bottom.data[idx + 2]
    const bA = bottom.data[idx + 3] / 255

    const outA = tA + bA * (1 - tA)
    const outR = outA > 0 ? (tR * tA + bR * bA * (1 - tA)) / outA : bR
    const outG = outA > 0 ? (tG * tA + bG * bA * (1 - tA)) / outA : bG
    const outB = outA > 0 ? (tB * tA + bB * bA * (1 - tA)) / outA : bB

    output.data[idx] = outR
    output.data[idx + 1] = outG
    output.data[idx + 2] = outB
    output.data[idx + 3] = outA * 255
  }
  return output
}

/**
 * 여러 레이어를 order 순서(낮은 값부터 높은 값)로 정렬한 후 순차적으로 합성합니다.
 * (bottomLayer 위에 topLayer를 덮어씌운다)
 */
export const compositeLayers = (layers: Layer[]): cv.Mat => {
  if (layers.length === 0) {
    throw new Error('레이어가 없습니다.')
  }
  // order 값 기준 오름차순 정렬 (가장 낮은 layer가 base)
  layers.sort((a, b) => a.order - b.order)
  let composite = layers[0].mat.clone()
  for (let i = 1; i < layers.length; i++) {
    const topLayer = layers[i].mat
    const blended = alphaBlend(topLayer, composite)
    composite.delete()
    composite = blended
  }
  return composite
}
