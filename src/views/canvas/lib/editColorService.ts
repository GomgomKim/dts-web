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

/*
 * 헤어 염색을 위한 색상 변경 함수
 *
 * @param {cv.Mat} img1 - 얼굴 이미지
 * @param {cv.Mat} img2 - 컬러 이미지
 * @param {number} min_v_value - V 채널 최소값
 * @param {number} max_v_value - V 채널 최대값
 * @param {number} level - 비선형 정규화 정도
 * @returns {cv.Mat} 결과 이미지
 */
export const coloringTypeIII = (
  img1: cv.Mat,
  img2: cv.Mat,
  min_v_value = 0,
  max_v_value = 255,
  level = 1.0
) => {
  const hsv1 = new cv.Mat()
  const hsv2 = new cv.Mat()
  cv.cvtColor(img1, hsv1, cv.COLOR_BGR2HSV_FULL)
  cv.cvtColor(img2, hsv2, cv.COLOR_BGR2HSV_FULL)

  const channels1 = new cv.MatVector()
  cv.split(hsv1, channels1)
  const value1 = channels1.get(2) // Value 채널

  const channels2 = new cv.MatVector()
  cv.split(hsv2, channels2)
  const value2 = channels2.get(2) // Value 채널

  const min_v_norm = min_v_value / 255
  const max_v_norm = max_v_value / 255
  const norm_w = (1 / 255) * (max_v_norm - min_v_norm)
  const norm_b = min_v_norm
  value1.convertTo(value1, cv.CV_32FC1, norm_w, norm_b)

  cv.pow(value1, level, value1)
  value2.convertTo(value2, cv.CV_32FC1)
  cv.multiply(value1, value2, value2)
  value2.convertTo(value2, cv.CV_8UC1)

  value2.copyTo(channels2.get(2))

  // 채널을 병합하여 결과 이미지 생성
  const resultHSV = new cv.Mat()
  cv.merge(channels2, resultHSV)

  // 결과 이미지를 다시 RGBA로 변환
  const result = new cv.Mat()
  cv.cvtColor(resultHSV, result, cv.COLOR_HSV2BGR)

  // 메모리 해제
  hsv1.delete()
  hsv2.delete()
  channels1.delete()
  channels2.delete()
  value1.delete()
  resultHSV.delete()

  return result
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

/**
 * 선택한 부위의 색상을 변경하는 함수
 *
 * @param {cv.Mat} modelImage: cv.CV_8UC3|cv.CV_8UC4
 * @param {cv.Mat} maskImage: cv.CV_8UC1
 * @param {number} featherAmount
 * @param {number} opacity: range [0.0~1.0]
 * @param {list} newColor
 * @returns {cv.Mat|string} 결과(cv.CV_8UC3;BGR) 혹은 오류 메시지
 */
export const applyMultiplyAndFeather = (
  modelImage: cv.Mat,
  maskImage: cv.Mat,
  featherAmount = 10,
  opacity = 1,
  newColor = [0, 0, 255],
  coloringType = 'type1',
  selectedSegment: number[] | null = null,
  level = 1.0,
  powerNorm = 1,
  rect = null,
  min_v_value = 0,
  max_v_value = 255
) => {
  if (!Number.isInteger(featherAmount) || featherAmount < 0) {
    throw new Error('적절한 featherAmount 값이 아닙니다.')
  } else if (opacity < 0 || opacity > 1) {
    throw new Error('적절한 opacity 값이 아닙니다.')
  }

  let oriModelImap = null
  let oriMaskMap = null
  let modelImap = null
  let maskMap = null
  const maskImap = new cv.Mat()

  // 세그먼트 필터링 부분 수정: selectedSegment가 배열인 경우 처리
  let processedMask: cv.Mat
  let createdFilteredMask = false
  if (selectedSegment !== null) {
    let tempMask: cv.Mat
    // maskImage가 단일 채널이 아니라면 그레이스케일로 변환
    if (maskImage.channels && maskImage.channels() > 1) {
      tempMask = new cv.Mat()
      if (maskImage.channels() === 4) {
        cv.cvtColor(maskImage, tempMask, cv.COLOR_RGBA2GRAY)
      } else if (maskImage.channels() === 3) {
        cv.cvtColor(maskImage, tempMask, cv.COLOR_BGR2GRAY)
      } else {
        maskImage.copyTo(tempMask)
      }
    } else {
      tempMask = maskImage.clone()
    }

    if (Array.isArray(selectedSegment)) {
      // 빈 마스크를 생성하고, 각 세그먼트별 마스크를 OR 연산으로 결합
      processedMask = new cv.Mat(
        tempMask.rows,
        tempMask.cols,
        tempMask.type(),
        new cv.Scalar(0)
      )
      selectedSegment.forEach((seg) => {
        const maskBinary = new cv.Mat()
        const constantMat = new cv.Mat(
          tempMask.rows,
          tempMask.cols,
          tempMask.type(),
          new cv.Scalar(seg)
        )
        cv.compare(tempMask, constantMat, maskBinary, cv.CMP_EQ)
        constantMat.delete()
        cv.bitwise_or(processedMask, maskBinary, processedMask)
        maskBinary.delete()
      })
      tempMask.delete()
      createdFilteredMask = true
    } else {
      processedMask = new cv.Mat()
      const constantMat = new cv.Mat(
        tempMask.rows,
        tempMask.cols,
        tempMask.type(),
        new cv.Scalar(selectedSegment)
      )
      cv.compare(tempMask, constantMat, processedMask, cv.CMP_EQ)
      constantMat.delete()
      tempMask.delete()
      createdFilteredMask = true
    }
  } else {
    processedMask = maskImage
  }
  // 필터링 끝

  if (rect) {
    const roi_rect = new cv.Rect(
      parseInt(rect[0]),
      parseInt(rect[1]),
      parseInt(rect[2]),
      parseInt(rect[3])
    )
    oriModelImap = toImap(modelImage)
    oriMaskMap = toMap(processedMask)
    modelImap = oriModelImap.roi(roi_rect)
    maskMap = oriMaskMap.roi(roi_rect)
  } else {
    modelImap = toImap(modelImage)
    maskMap = toMap(processedMask)
  }

  const width = modelImap.cols
  const height = modelImap.rows
  let colorImap = new cv.Mat(
    height,
    width,
    cv.CV_32FC3,
    new cv.Scalar(newColor[0], newColor[1], newColor[2])
  )

  // 색상 이미지에 멀티플라이 블렌딩 적용 (색상 조절)
  if (coloringType === 'type1') {
    cv.multiply(modelImap, colorImap, colorImap, 1.0 / 255.0)
  }

  if (coloringType === 'type2') {
    const tempImap = colorImap
    colorImap = coloringTypeII(modelImap, colorImap)
    tempImap.delete()
  }

  if (coloringType === 'type3') {
    const tempImap = colorImap
    colorImap = coloringTypeIII(
      modelImap,
      colorImap,
      min_v_value,
      max_v_value,
      level
    )
    tempImap.delete()
  }

  // 페더링 효과 적용한 마스크 생성
  cv.normalize(maskMap, maskMap, 0, 1, cv.NORM_MINMAX, cv.CV_32FC1)
  cv.pow(maskMap, powerNorm, maskMap)
  if (featherAmount > 0) {
    const ksize = featherAmount * 2 + 1
    const ksizeObj = new cv.Size(ksize, ksize)
    cv.GaussianBlur(maskMap, maskMap, ksizeObj, 0)
  }
  maskMap.convertTo(maskMap, cv.CV_32FC1, opacity)
  to3D(maskMap, maskImap)

  // 1. alpha 채널 생성
  // maskMap을 0~255 범위의 8비트 단일 채널 이미지로 변환
  const alphaMap = new cv.Mat()
  maskMap.convertTo(alphaMap, cv.CV_8UC1, 255)

  // 2. colorImap을 8비트 3채널(BGR) 이미지로 변환
  const color8U = new cv.Mat()
  colorImap.convertTo(color8U, cv.CV_8UC3)

  // 3. B, G, R 채널을 분리한 후, alphaMap을 4번째 채널로 추가해 4채널 RGBA 이미지 생성
  const channels = new cv.MatVector()
  cv.split(color8U, channels) // channels: [B, G, R]
  channels.push_back(alphaMap) // 4번째 채널에 alpha 추가
  const rgba = new cv.Mat()
  cv.merge(channels, rgba)

  // 4. 결과 이미지를 base64로 변환
  const resImage = matToBase64(rgba)

  // 메모리 정리
  if (rect) {
    if (oriModelImap) oriModelImap.delete()
    if (oriMaskMap) oriMaskMap.delete()
    if (modelImap) modelImap.delete()
    if (maskMap) maskMap.delete()
  } else {
    if (modelImap) modelImap.delete()
    if (maskMap) maskMap.delete()
  }
  if (maskImap) maskImap.delete()
  if (colorImap) colorImap.delete()
  if (color8U) color8U.delete()
  if (alphaMap) alphaMap.delete()
  if (channels) channels.delete()
  if (rgba) rgba.delete()

  // 만약 필터링을 통해 생성한 경우, processedMask 해제
  if (createdFilteredMask) {
    processedMask.delete()
  }

  return resImage
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
