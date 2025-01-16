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

    segmentMask.convertTo(segmentMask, cv.CV_32FC1, opacity)

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

  const result = matToBase64(modelImap)

  // 메모리 정리
  modelImap.delete()
  maskMap.delete()
  currentModelMat.delete()

  return result
}

// 메모리 정리 함수 추가
export const clearSegmentColors = () => {
  segmentFeatherValues.clear()
  segmentColorMap.clear()
  if (originalModelMat) {
    originalModelMat.delete()
    originalModelMat = null
  }
}
