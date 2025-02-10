import { matToBase64 } from './editColorService'

/**
 * 렌즈 합성을 위한 눈 부분이 투명한 전경 이미지 생성 함수
 *
 * @param {cv.Mat} modelImage - 얼굴 이미지 (cv.CV_8UC3 또는 cv.CV_8UC4)
 * @param {cv.Mat} segMap - 분할 지도 이미지 (cv.CV_8UC1)
 * @returns {string} 결과 이미지의 Base64 문자열 (알파 채널에서 눈 부위만 0, 나머지는 255)
 */
const getBlackEyesFace = (modelImage: cv.Mat, segMap: cv.Mat): string => {
  try {
    if (!modelImage || !segMap) return ''

    const l_eye: number = 4
    const r_eye: number = 5

    // 왼쪽 눈 영역 추출을 위해 segMap과 비교 값 생성
    const leftEyeMat: cv.Mat = new cv.Mat(
      segMap.rows,
      segMap.cols,
      cv.CV_8UC1,
      new cv.Scalar(l_eye)
    )
    cv.compare(segMap, leftEyeMat, leftEyeMat, cv.CMP_EQ)

    // 오른쪽 눈 영역 추출을 위해 segMap과 비교 값 생성
    const rightEyeMat: cv.Mat = new cv.Mat(
      segMap.rows,
      segMap.cols,
      cv.CV_8UC1,
      new cv.Scalar(r_eye)
    )
    cv.compare(segMap, rightEyeMat, rightEyeMat, cv.CMP_EQ)

    // 두 눈 영역을 결합하여 알파 채널로 사용 (눈 부분은 0, 그 외는 255)
    const alpha: cv.Mat = new cv.Mat()
    cv.bitwise_or(leftEyeMat, rightEyeMat, alpha)
    cv.bitwise_not(alpha, alpha)
    alpha.convertTo(alpha, cv.CV_8UC1, 255)

    // 얼굴 이미지에서 컬러 채널을 분리
    const channels: cv.MatVector = new cv.MatVector()
    cv.split(modelImage, channels)

    const ch0: cv.Mat = channels.get(0)
    const ch1: cv.Mat = channels.get(1)
    const ch2: cv.Mat = channels.get(2)
    // merge 시 in-place 문제를 피하기 위해 클론 생성
    const mergeCh0 = ch0.clone()
    const mergeCh1 = ch1.clone()
    const mergeCh2 = ch2.clone()
    const mergeAlpha = alpha.clone()

    // 채널 벡터에 클론한 채널 추가
    const chs: cv.MatVector = new cv.MatVector()
    chs.push_back(mergeCh0)
    chs.push_back(mergeCh1)
    chs.push_back(mergeCh2)
    chs.push_back(mergeAlpha)

    // RGBA 매트릭스를 미리 초기화 (모델 이미지와 동일한 크기, 4채널로)
    const rgba: cv.Mat = new cv.Mat(
      modelImage.rows,
      modelImage.cols,
      cv.CV_8UC4
    )
    // 채널 결합
    cv.merge(chs, rgba)

    // matToBase64 함수는 cv.Mat을 Base64 문자열로 변환해 주는 유틸리티 함수로 가정합니다.
    const resImage: string = matToBase64(rgba)

    // 메모리 해제: 원래 채널 및 클론 객체들 모두 해제
    leftEyeMat.delete()
    rightEyeMat.delete()
    alpha.delete()
    ch0.delete()
    ch1.delete()
    ch2.delete()
    channels.delete()
    chs.delete()
    mergeCh0.delete()
    mergeCh1.delete()
    mergeCh2.delete()
    mergeAlpha.delete()
    rgba.delete()

    return resImage
  } catch (error) {
    console.error('getBlackEyesFace 에러:', error)
    throw error
  }
}

export { getBlackEyesFace }
