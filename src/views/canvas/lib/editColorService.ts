export const matToBase64 = (input_mat: cv.Mat): string => {
  let mat: cv.Mat | null = null
  const type = input_mat.type()

  if (type === cv.CV_8UC3) {
    mat = new cv.Mat()
    cv.cvtColor(input_mat, mat, cv.COLOR_BGR2BGRA)
  } else if (type === cv.CV_32FC1) {
    const umat = new cv.Mat()
    mat = new cv.Mat()
    input_mat.convertTo(umat, cv.CV_8UC1)
    cv.cvtColor(umat, mat, cv.COLOR_GRAY2BGRA)
    umat.delete()
  } else if (type === cv.CV_32FC3) {
    const umat = new cv.Mat()
    mat = new cv.Mat()
    input_mat.convertTo(umat, cv.CV_8UC3)
    cv.cvtColor(umat, mat, cv.COLOR_BGR2BGRA)
    umat.delete()
  } else if (type === cv.CV_32FC4) {
    mat = new cv.Mat()
    input_mat.convertTo(mat, cv.CV_8UC4)
  } else {
    mat = input_mat
  }

  // canvas에 RGBA 데이터를 그림
  const canvas = document.createElement('canvas')
  canvas.width = mat.cols
  canvas.height = mat.rows

  const ctx = canvas.getContext('2d')
  if (!ctx) {
    throw new Error('Failed to get 2D context from canvas')
  }

  const imgData = new ImageData(
    new Uint8ClampedArray(mat.data),
    mat.cols,
    mat.rows
  )
  ctx.putImageData(imgData, 0, 0)

  // Base64
  const dataURL = canvas.toDataURL('image/png')

  // 메모리 해제
  if (
    type === cv.CV_8UC3 ||
    type === cv.CV_32FC1 ||
    type === cv.CV_32FC3 ||
    type === cv.CV_32FC4
  ) {
    mat.delete()
  }

  return dataURL
}

export const base64ToMat = (base64: string): Promise<cv.Mat> => {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.onload = () => {
      const canvas = document.createElement('canvas')
      canvas.width = img.width
      canvas.height = img.height
      const ctx = canvas.getContext('2d')
      if (!ctx) return reject(new Error('2d context 없음'))
      ctx.drawImage(img, 0, 0)
      // cv.imread 기본적으로 8UC4 (RGBA) 로 읽어옴
      const mat = window.cv.imread(canvas)
      resolve(mat)
    }
    img.onerror = (err) => reject(err)
    img.src = base64
  })
}

// cv.Mat → float32 BGR (Imap) 로 변환
const toImap = (matSrc: cv.Mat): cv.Mat => {
  const type = matSrc.type()
  const newImap = new cv.Mat()
  if (type === cv.CV_8UC4) {
    const bgr = new cv.Mat()
    cv.cvtColor(matSrc, bgr, cv.COLOR_BGRA2BGR)
    bgr.convertTo(newImap, cv.CV_32FC3)
    bgr.delete()
  } else {
    matSrc.convertTo(newImap, cv.CV_32FC3)
  }
  return newImap
}

// cv.Mat → float32 Gray Map (0.0~1.0) 로 변환
const toMap = (matSrc: cv.Mat): cv.Mat => {
  const type = matSrc.type()
  const newMap = new cv.Mat()
  if (type === cv.CV_8UC3 || type === cv.CV_8UC4) {
    const gray = new cv.Mat()
    cv.cvtColor(matSrc, gray, cv.COLOR_BGR2GRAY)
    gray.convertTo(newMap, cv.CV_32FC1)
    gray.delete()
  } else {
    matSrc.convertTo(newMap, cv.CV_32FC1)
  }
  cv.normalize(newMap, newMap, 0, 1, cv.NORM_MINMAX, cv.CV_32FC1)
  return newMap
}

const coloringTypeII = (img1: cv.Mat, img2: cv.Mat): cv.Mat => {
  // 예: Hue+S는 img2, V는 img1
  const hsv1 = new cv.Mat()
  const hsv2 = new cv.Mat()
  cv.cvtColor(img1, hsv1, cv.COLOR_BGR2HSV)
  cv.cvtColor(img2, hsv2, cv.COLOR_BGR2HSV)

  const ch1 = new cv.MatVector()
  const ch2 = new cv.MatVector()
  cv.split(hsv1, ch1)
  cv.split(hsv2, ch2)

  // 예) 원본 밝기(V1) 유지, 새 컬러의 Hue/S
  const hue2 = ch2.get(0)
  const sat2 = ch2.get(1)
  const val1 = ch1.get(2) // 원본 V

  const mergedHsv = new cv.Mat()
  const mergedVec = new cv.MatVector()
  mergedVec.push_back(hue2)
  mergedVec.push_back(sat2)
  mergedVec.push_back(val1)
  cv.merge(mergedVec, mergedHsv)

  const resultBgr = new cv.Mat()
  cv.cvtColor(mergedHsv, resultBgr, cv.COLOR_HSV2BGR)

  hsv1.delete()
  hsv2.delete()
  ch1.delete()
  ch2.delete()
  hue2.delete()
  sat2.delete()
  val1.delete()
  mergedHsv.delete()
  mergedVec.delete()

  return resultBgr
}

const to3D = (src: cv.Mat, dst: cv.Mat) => {
  // 1 채널(src)을 3채널(dst)로 확장
  const channels = new cv.MatVector()
  channels.push_back(src)
  channels.push_back(src)
  channels.push_back(src)
  cv.merge(channels, dst)
  channels.delete()
}

let originalModelMat: cv.Mat | null = null
// 세그먼트별 현재 적용된 색상을 저장하는 Map
const segmentColorMap = new Map<number, [number, number, number]>()
const segmentOpacityMap = new Map<number, number>()
const segmentFeatherValues = new Map<number, number>()

export const applyMultiplyAndFeather = (
  modelImage: cv.Mat,
  maskImage: cv.Mat,
  opacity = 1,
  newColor: [number, number, number] = [0, 0, 255],
  powerNorm = 1,
  coloringType: 'type1' | 'type2' = 'type1',
  targetSegments?: number[],
  segmentFeatherMap?: Map<number, number>
): string => {
  if (!targetSegments) {
    return matToBase64(modelImage)
  }

  // 새로운 feather 값들을 전역 Map에 저장
  if (segmentFeatherMap) {
    for (const [segment, value] of Array.from(segmentFeatherMap.entries())) {
      segmentFeatherValues.set(segment, value)
    }
  }

  // 타겟 세그먼트들에 새로운 색상 저장
  targetSegments.forEach((segment) => {
    segmentColorMap.set(segment, newColor)
    segmentOpacityMap.set(segment, opacity)
  })

  if (!originalModelMat) {
    originalModelMat = modelImage.clone()
  }

  // 원본 이미지로부터 시작
  const currentModelMat = originalModelMat.clone()
  const modelImap = toImap(currentModelMat)
  const maskMap = toMap(maskImage)

  // 모든 세그먼트에 대해 저장된 색상 적용
  for (const [segment, color] of Array.from(segmentColorMap.entries())) {
    // 현재 세그먼트에 대한 마스크 생성
    const segmentMask = new cv.Mat(maskMap.rows, maskMap.cols, cv.CV_32FC1)
    const segmentOpacity = segmentOpacityMap.get(segment) ?? 1
    for (let i = 0; i < maskMap.rows; i++) {
      for (let j = 0; j < maskMap.cols; j++) {
        const val = maskImage.ucharAt(i, j)
        segmentMask.floatPtr(i, j)[0] = val === segment ? 1 : 0
      }
    }

    // 마스크 처리 - 세그먼트별 featherAmount 적용 (기본값 : 1)
    const currentFeatherAmount = segmentFeatherValues.get(segment) ?? 1
    if (currentFeatherAmount > 0) {
      const ksize = Math.max(1, Math.round(currentFeatherAmount)) * 2 + 1
      cv.GaussianBlur(segmentMask, segmentMask, new cv.Size(ksize, ksize), 0)
    }

    // 색상 적용
    let colorImap = new cv.Mat(
      modelImap.rows,
      modelImap.cols,
      cv.CV_32FC3,
      new cv.Scalar(color[0], color[1], color[2])
    )

    if (coloringType === 'type1') {
      cv.multiply(modelImap, colorImap, colorImap, powerNorm / 255.0)
    } else {
      const tmp = colorImap
      colorImap = coloringTypeII(modelImap, colorImap)
      tmp.delete()
    }

    // 투명도를 마스크에 적용
    segmentMask.convertTo(segmentMask, cv.CV_32FC1, segmentOpacity)

    const maskImap = new cv.Mat()
    to3D(segmentMask, maskImap)

    const tempColorImap = new cv.Mat()
    cv.multiply(colorImap, maskImap, tempColorImap)

    maskImap.convertTo(maskImap, cv.CV_32FC3, -1.0, 1.0)
    cv.multiply(modelImap, maskImap, modelImap)

    cv.add(tempColorImap, modelImap, modelImap)

    // 메모리 정리
    colorImap.delete()
    maskImap.delete()
    tempColorImap.delete()
    segmentMask.delete()
  }

  // 색상 적용 부분을 더 명확하게 수정
  targetSegments.forEach((segment) => {
    const mask = new cv.Mat()
    const segmentMat = new cv.Mat(
      maskImage.rows,
      maskImage.cols,
      maskImage.type(),
      new cv.Scalar(segment)
    )

    // 마스크 이미지와 세그먼트 값 비교
    cv.compare(maskImage, segmentMat, mask, cv.CMP_EQ)

    // 이미지 복사본 사용 (충돌 방지용)
    const safeModelImage = getSafeModelImage(modelImage)

    // 클론된 safeModelImage를 기반으로 색상 매트릭스 생성
    const colorMat = new cv.Mat(
      safeModelImage.rows,
      safeModelImage.cols,
      safeModelImage.type(),
      new cv.Scalar(newColor[0], newColor[1], newColor[2], 255)
    )

    // 색상 매트릭스를 기존 modelImage에 적용 (mask로 영역 지정)
    colorMat.copyTo(safeModelImage, mask)

    // 메모리 해제: mask, colorMat, segmentMat, 그리고 클론된 safeModelImage 삭제
    mask.delete()
    colorMat.delete()
    segmentMat.delete()
  })

  const result = matToBase64(modelImap)

  // 메모리 정리
  modelImap.delete()
  maskMap.delete()
  currentModelMat.delete()

  return result
}

export const updateOriginalModelMat = (newMat: cv.Mat) => {
  if (originalModelMat) {
    originalModelMat.delete()
  }
  originalModelMat = newMat.clone()
}

/**
 * 모델 매트릭스가 유효한지 확인한 후, 안전한 복제본 반환
 */
export const getSafeModelImage = (modelImage: cv.Mat): cv.Mat => {
  try {
    return modelImage.clone()
  } catch (e) {
    if (originalModelMat) {
      return originalModelMat.clone()
    }
    throw new Error('유효한 modelImage가 없습니다.')
  }
}

/**
 * threshold를 사용하여 단일 값에 대한 마스크 생성
 */
export function thresholdInRange(
  src: cv.Mat,
  lowerb: [number, number, number],
  upperb: [number, number, number],
  mask: cv.Mat
): void {
  if (!src || src.empty()) {
    return
  }

  // 단일 채널 이미지인 경우 (CV_8UC1)
  if (src.type() === cv.CV_8UC1) {
    // 하한 임계값 적용 (픽셀 >= lowerb[0]이면 255)
    const lowerMask = new cv.Mat()
    cv.threshold(src, lowerMask, lowerb[0], 255, cv.THRESH_BINARY)

    // 상한 임계값 적용 (픽셀 <= upperb[0]이면 255)
    const upperMask = new cv.Mat()
    cv.threshold(src, upperMask, upperb[0], 255, cv.THRESH_BINARY_INV)

    // 두 마스크를 논리 AND하여 최종 마스크 생성
    cv.bitwise_and(lowerMask, upperMask, mask)

    // 메모리 해제
    lowerMask.delete()
    upperMask.delete()
  } else {
    // 다중 채널 이미지인 경우 기존 로직 유지
    const channels = new cv.MatVector()
    cv.split(src, channels)

    const lowerMask = new cv.Mat()
    const upperMask = new cv.Mat()
    const tempMask = new cv.Mat()

    try {
      for (let i = 0; i < channels.size(); i++) {
        const channel = channels.get(i)

        if (!channel || channel.empty()) {
          continue
        }

        cv.threshold(channel, lowerMask, lowerb[i], 255, cv.THRESH_BINARY)
        cv.threshold(channel, upperMask, upperb[i], 255, cv.THRESH_BINARY_INV)
        cv.bitwise_and(lowerMask, upperMask, tempMask)

        if (i === 0) {
          tempMask.copyTo(mask)
        } else {
          cv.bitwise_and(mask, tempMask, mask)
        }

        channel.delete()
      }
    } finally {
      channels.delete()
      lowerMask.delete()
      upperMask.delete()
      tempMask.delete()
    }
  }
}

let originalRelightModelMat: cv.Mat | null = null
export const relight = (
  modelImage: cv.Mat,
  maskImage: cv.Mat | null,
  normalImage: cv.Mat,
  lightYaw: number,
  lightPitch: number,
  specularPower: number,
  ambientLight: number,
  normalDiffuseStrength: number,
  specularHighlightsStrength: number,
  totalGain: number,
  inputType: string = 'euler'
): string | cv.Mat => {
  const width = modelImage.cols
  const height = modelImage.rows

  if (!originalRelightModelMat) {
    originalRelightModelMat = modelImage.clone()
  }

  const currentModelMat = originalRelightModelMat.clone()
  const modelImap = toImap(currentModelMat)
  const faceMaskMap = getFaceMask(maskImage)
  let maskMap
  if (faceMaskMap) {
    maskMap = toMap(faceMaskMap)
    cv.normalize(maskMap, maskMap, 0, 1, cv.NORM_MINMAX, cv.CV_32FC1)
  }

  const normalImap: cv.Mat = toImap(normalImage)

  if (normalImap.cols !== width || normalImap.rows !== height) {
    cv.resize(
      normalImap,
      normalImap,
      new cv.Size(width, height),
      0,
      0,
      cv.INTER_LINEAR
    )
  }

  // assume normalImap's elements are in [0, 255] => normalize to [-1, 1]
  normalizeL2(normalImap, normalImap)

  // Diffuse 계산
  const lightDirection: number[] =
    inputType === 'euler'
      ? eulerToVector(lightYaw, lightPitch)
      : normalizeVector(lightYaw, lightPitch, 1)

  const diffuseImap: cv.Mat = new cv.Mat(
    height,
    width,
    cv.CV_32FC3,
    new cv.Scalar(lightDirection[0], lightDirection[1], lightDirection[2])
  )

  const diffuseMap: cv.Mat = new cv.Mat(
    diffuseImap.rows,
    diffuseImap.cols,
    cv.CV_32FC1
  )

  cv.multiply(normalImap, diffuseImap, diffuseImap)

  reduce(diffuseImap, diffuseMap)

  cv.threshold(diffuseMap, diffuseMap, 1.0, 1.0, cv.THRESH_TRUNC)

  if (maskImage && maskMap) {
    cv.multiply(diffuseMap, maskMap, diffuseMap)
  }
  diffuseMap.convertTo(
    diffuseMap,
    cv.CV_32FC1,
    normalDiffuseStrength,
    ambientLight
  )

  to3D(diffuseMap, diffuseImap)

  cv.multiply(modelImap, diffuseImap, modelImap, totalGain)

  // Specular 계산
  const highlightImap: cv.Mat = diffuseImap // 동일 메모리 사용
  const highlightMap: cv.Mat = diffuseMap // 동일 메모리 사용
  const cameraDirection: number[] = eulerToVector(0, 0)
  const halfVector: number[] = normalizeList([
    lightDirection[0] + cameraDirection[0],
    lightDirection[1] + cameraDirection[1],
    lightDirection[2] + cameraDirection[2]
  ])
  highlightImap.setTo(
    new cv.Scalar(halfVector[0], halfVector[1], halfVector[2])
  )

  cv.multiply(normalImap, highlightImap, highlightImap)

  reduce(highlightImap, highlightMap)

  cv.threshold(highlightMap, highlightMap, 1, 1, cv.THRESH_TRUNC)

  cv.pow(highlightMap, specularPower, highlightMap)
  if (maskImage && maskMap) {
    cv.multiply(highlightMap, maskMap, highlightMap)
  }
  highlightMap.convertTo(
    highlightMap,
    cv.CV_32FC1,
    specularHighlightsStrength * 255 * totalGain
  )

  to3D(highlightMap, highlightImap)

  // 최종 결과 계산
  cv.add(modelImap, highlightImap, modelImap)

  const resImage: string = matToBase64(modelImap)

  if (maskMap) {
    maskMap.delete()
  }
  currentModelMat.delete()
  modelImap.delete()
  normalImap.delete()
  diffuseImap.delete()
  diffuseMap.delete()
  return resImage
}

/**
 * L2 타입으로 정규화
 *
 * @param mat - 변환할 cv.Mat (cv.CV_32F 타입, 입력 매트릭스)
 * @param res - 정규화된 cv.Mat (cv.CV_32F 타입, 출력 매트릭스)
 */
export const normalizeL2 = (mat: cv.Mat, res: cv.Mat): void => {
  const rows: number = mat.rows
  const cols: number = mat.cols

  const channels: cv.MatVector = new cv.MatVector()

  // 입력 매트릭스를 cv.CV_32F 타입으로 변환 (베타 값 -128 적용)
  mat.convertTo(mat, cv.CV_32F, 1, -128)

  cv.split(mat, channels)

  const ch0: cv.Mat = channels.get(0)
  const ch1: cv.Mat = channels.get(1)
  const ch2: cv.Mat = channels.get(2)

  const temp1: cv.Mat = new cv.Mat(rows, cols, cv.CV_32F)
  const temp2: cv.Mat = new cv.Mat(rows, cols, cv.CV_32F)

  cv.multiply(ch0, ch0, temp1)
  cv.multiply(ch1, ch1, temp2)
  cv.add(temp1, temp2, temp1)
  cv.multiply(ch2, ch2, temp2)
  cv.add(temp1, temp2, temp1)
  cv.sqrt(temp1, temp2)

  cv.divide(ch0, temp2, ch0)
  cv.divide(ch1, temp2, ch1)
  cv.divide(ch2, temp2, ch2)

  const normalizedChannels: cv.MatVector = new cv.MatVector()
  normalizedChannels.push_back(ch0)
  normalizedChannels.push_back(ch1)
  normalizedChannels.push_back(ch2)

  cv.merge(normalizedChannels, res)

  // 메모리 해제
  ch0.delete()
  ch1.delete()
  ch2.delete()
  temp1.delete()
  temp2.delete()
  normalizedChannels.delete()
  channels.delete()
}

/**
 * Euler 각도를 벡터로 변환
 */
export const eulerToVector = (yaw: number, pitch: number): number[] => {
  const yawRad = (yaw * Math.PI) / 180
  const pitchRad = (pitch * Math.PI) / 180
  const cosPitch = Math.cos(pitchRad)
  const sinPitch = Math.sin(pitchRad)
  const cosYaw = Math.cos(yawRad)
  const sinYaw = Math.sin(yawRad)
  return [sinYaw * cosPitch, sinPitch, cosPitch * cosYaw]
}

// 3D 벡터 정규화
export const normalizeVector = (x: number, y: number, z: number): number[] => {
  const length = Math.sqrt(x * x + y * y + z * z)

  if (length === 0) {
    return [0, 0, 0]
  }

  return [x / length, y / length, z / length]
}

/**
 * 3채널 Mat의 각 채널을 합산하여 1채널 Mat로 변환
 */
export const reduce = (mat: cv.Mat, res: cv.Mat): void => {
  if (res.empty()) {
    res.create(mat.rows, mat.cols, cv.CV_32FC1)
  }

  const channels = new cv.MatVector()
  let ch0: cv.Mat | null = null
  let ch1: cv.Mat | null = null
  let ch2: cv.Mat | null = null

  try {
    cv.split(mat, channels)
    ch0 = channels.get(0)
    ch1 = channels.get(1)
    ch2 = channels.get(2)

    cv.add(ch0, ch1, res)
    cv.add(res, ch2, res)
  } catch (error) {
    console.error('reduce 함수 에러:', error)
  } finally {
    // 생성된 모든 객체 정리
    if (ch0) ch0.delete()
    if (ch1) ch1.delete()
    if (ch2) ch2.delete()
    channels.delete()
  }
}

/**
 * 리스트를 L2 정규화
 */
export const normalizeList = (list: number[]): number[] => {
  const norm = Math.sqrt(list.reduce((acc, val) => acc + val * val, 0))
  return norm === 0 ? [0, 0, 0] : list.map((val) => val / norm)
}

/**
 * 얼굴 영역에 해당하는 마스크(cv.Mat)를 생성하는 함수
 * @param maskMat 원본 마스크 Mat (cv.Mat | null)
 * @returns 얼굴 영역만 있는 마스크 Mat (cv.Mat) 또는 maskMat이 없으면 null
 */
export const getFaceMask = (maskMat: cv.Mat | null): cv.Mat | null => {
  if (!maskMat) return null

  // 얼굴 영역에 해당하는 값 목록 (프로젝트에 맞게 조정 가능)
  const targetValues = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 19, 20, 21, 22]
  const rows = maskMat.rows
  const cols = maskMat.cols
  const faceMask = cv.Mat.zeros(rows, cols, cv.CV_8UC1)
  const valueMat = new cv.Mat(rows, cols, cv.CV_8UC1)

  for (const value of targetValues) {
    valueMat.setTo(new cv.Scalar(value))
    const temp = new cv.Mat()
    cv.compare(maskMat, valueMat, temp, cv.CMP_EQ) // maskMat 과 valueMat 비교
    cv.bitwise_or(faceMask, temp, faceMask) // OR 연산으로 얼굴 영역 마스크 생성
    temp.delete()
  }
  valueMat.delete()
  return faceMask
}
