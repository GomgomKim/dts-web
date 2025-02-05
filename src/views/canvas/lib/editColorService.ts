const matToBase64 = (input_mat: cv.Mat): string => {
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

let originalHairModelMat: cv.Mat | null = null
export const dyeHairColor = (
  modelImage: cv.Mat,
  maskImage: cv.Mat,
  featherAmount = 10,
  opacity = 1,
  minNorm = 0.0,
  newColor: [number, number, number] = [0, 0, 255]
): string => {
  if (!Number.isInteger(featherAmount) || featherAmount < 0) {
    throw new Error('Not proper value for featherAmount')
  } else if (opacity < 0 || opacity > 1) {
    throw new Error('Not proper value for opacity')
  }

  // 첫 호출시 원본 이미지 저장
  if (!originalHairModelMat) {
    originalHairModelMat = modelImage.clone()
  }

  // 원본 이미지로부터 시작
  const currentModelMat = originalHairModelMat.clone()

  const width = currentModelMat.cols
  const height = currentModelMat.rows

  const modelImap = toImap(currentModelMat)
  const maskImap = new cv.Mat()
  const maskMap = toMap(maskImage)
  const colorImap = new cv.Mat(
    height,
    width,
    cv.CV_32FC3,
    new cv.Scalar(newColor[0], newColor[1], newColor[2])
  )

  const newModelMap = modelImap.clone()
  cv.normalize(
    newModelMap,
    newModelMap,
    minNorm,
    1,
    cv.NORM_MINMAX,
    cv.CV_32FC1
  )
  cv.sqrt(newModelMap, newModelMap)
  cv.multiply(newModelMap, colorImap, colorImap)
  newModelMap.delete()

  cv.normalize(maskMap, maskMap, 0, 1, cv.NORM_MINMAX, cv.CV_32FC1)
  if (featherAmount > 0) {
    const ksize = featherAmount * 2 + 1
    const ksizeObj = new cv.Size(ksize, ksize)
    cv.GaussianBlur(maskMap, maskMap, ksizeObj, 0)
  }
  maskMap.convertTo(maskMap, cv.CV_32FC1, opacity)
  to3D(maskMap, maskImap)

  cv.multiply(colorImap, maskImap, colorImap)

  maskImap.convertTo(maskImap, cv.CV_32F, -1.0, 1.0)
  cv.multiply(modelImap, maskImap, modelImap)

  cv.add(colorImap, modelImap, modelImap)

  // 색상 적용
  for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
      if (maskMap.ucharAt(i, j) === 254) {
        // 세그먼트 값 확인
        currentModelMat.ucharPtr(i, j)[0] = newColor[0] // B
        currentModelMat.ucharPtr(i, j)[1] = newColor[1] // G
        currentModelMat.ucharPtr(i, j)[2] = newColor[2] // R
      }
    }
  }

  const resImage = matToBase64(modelImap)

  modelImap.delete()
  maskImap.delete()
  maskMap.delete()
  colorImap.delete()

  return resImage
}

export const updateOriginalModelMat = (newMat: cv.Mat) => {
  if (originalModelMat) {
    originalModelMat.delete()
  }
  originalModelMat = newMat.clone()
}

/**
 * 머리 색상과 브러시 색상을 합성하여 최종 매트릭스 반환
 * @param hairMat 머리 색상이 적용된 매트릭스 (세그먼트 13)
 * @param brushMaskMat 브러시로 칠한 영역의 마스크 매트릭스 (세그먼트 254)
 * @param hairMaskMat 머리 영역의 원본 마스크 매트릭스 (세그먼트 13과 254 포함)
 * @param hairColor 머리 색상 [B, G, R]
 * @returns 최종 합성된 매트릭스 또는 null
 */
export const compositeHairAndBrush = (
  hairMat: cv.Mat | null,
  brushMaskMat: cv.Mat | null,
  hairMaskMat: cv.Mat,
  hairColor: [number, number, number]
): cv.Mat | null => {
  if (
    !hairMat ||
    !brushMaskMat ||
    brushMaskMat.empty() ||
    !originalHairModelMat
  ) {
    return null
  }
  // 원본 머리 이미지(아직 어떤 색상도 적용되지 않은 상태)를 항상 기준으로 사용
  const composite = originalHairModelMat.clone()

  // 머리 영역 적용 (세그먼트 13)
  const hairRegionMask = new cv.Mat()
  thresholdInRange(hairMaskMat, [13, 13, 13], [13, 13, 13], hairRegionMask)

  const hairColorMat = new cv.Mat(
    composite.rows,
    composite.cols,
    composite.type(),
    new cv.Scalar(hairColor[0], hairColor[1], hairColor[2], 255)
  )

  // 머리 영역에 헤어 컬러 덮어쓰기
  hairColorMat.copyTo(composite, hairRegionMask)

  // 브러시 영역 적용 (세그먼트 254)
  const brushRegionMask = new cv.Mat()
  brushMaskMat.copyTo(brushRegionMask)

  const brushColorMat = new cv.Mat(
    composite.rows,
    composite.cols,
    composite.type(),
    new cv.Scalar(hairColor[0], hairColor[1], hairColor[2], 255)
  )

  // 브러시 영역에 덮어쓰기
  brushColorMat.copyTo(composite, brushRegionMask)

  // 메모리 해제
  hairRegionMask.delete()
  hairColorMat.delete()
  brushRegionMask.delete()
  brushColorMat.delete()

  return composite
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

// TODO Revert to Original 버튼 클릭 시 호출
export const resetAllMatOperations = (originalImage: cv.Mat): cv.Mat => {
  // 기존에 저장된 원본 매트릭스 삭제 (존재한다면)
  if (originalModelMat) {
    originalModelMat.delete()
  }
  if (originalHairModelMat) {
    originalHairModelMat.delete()
  }
  // 입력받은 originalImage(초기 이미지)로 두 매트릭스를 다시 초기화합니다.
  originalModelMat = originalImage.clone()
  originalHairModelMat = originalImage.clone()

  // 필요 시 다른 글로벌 상태들도 초기화합니다.
  segmentColorMap.clear()
  segmentOpacityMap.clear()
  segmentFeatherValues.clear()

  // 상태 복원 후 클론본을 반환하여, 이를 사용해 화면의 modelMat도 업데이트할 수 있습니다.
  return originalModelMat.clone()
}
