/**
 * OpenCV.js를 TypeScript에서 사용할 때 필요한 타입 선언
 */
declare global {
  namespace cv {
    class MatVector {
      constructor()
      size(): number
      get(index: number): Mat
      delete(): void
      push_back(mat: Mat): void
    }
    class Mat {
      constructor()
      constructor(rows: number, cols: number, type: number, scalar?: Scalar)

      delete(): void
      cols: number
      rows: number
      data: Uint8Array | Float32Array
      type(): number
      channels(): number
      ptr(): number;
      roi(rect: Rect): Mat
      convertTo(dst: Mat, type: number, alpha?: number, beta?: number): void
      copyTo(dst: Mat, mask?: Mat): void
      setTo(value: Scalar, mask?: Mat): void
      clone(): Mat
      empty(): boolean
      create(rows: number, cols: number, type: number): void

      // 픽셀값(uchar)을 읽어오는 함수
      ucharAt(row: number, col: number): number
      ucharPtr(row: number, col: number): Uint8Array

      // Mat.zeros(...) static 메서드
      static zeros(rows: number, cols: number, type: number): Mat

      static ones(rows: number, cols: number, type: number): Mat

      floatPtr(row: number, col: number): Float32Array
    }

    class MatVector {
      constructor()
      push_back(mat: Mat): void
      get(index: number): Mat
      delete(): void
    }

    class Size {
      constructor(width: number, height: number)
    }

    class Scalar {
      constructor(v0: number, v1?: number, v2?: number, v3?: number)
    }

    class Rect {
      constructor(x: number, y: number, width: number, height: number)
      x: number
      y: number
      width: number
      height: number
    }

    class Point {
      constructor(x: number, y: number)
      x: number
      y: number
    }

    const CV_8UC1: number
    const CV_8UC3: number
    const CV_8UC4: number
    const CV_32F: number
    const CV_32FC1: number
    const CV_32FC3: number
    const CV_8UC1: number
    const CV_32FC4: number

    const COLOR_BGR2RGBA: number
    const COLOR_BGRA2BGR: number
    const COLOR_BGR2GRAY: number
    const COLOR_BGR2HSV: number
    const COLOR_BGR2HSV_FULL: number
    const COLOR_HSV2BGR: number
    const COLOR_GRAY2BGRA: number
    const COLOR_GRAY2BGR: number
    const COLOR_BGR2BGRA: number
    const COLOR_BGRA2RGBA: number
    const COLOR_RGBA2GRAY: number
    const COLOR_BGRA2GRAY: number
    const COLOR_RGBA2BGRA: number
    const NORM_MINMAX: number
    const onRuntimeInitialized: boolean | undefined

    // 비교 연산 상수와 함수
    const CMP_EQ: number
    const CMP_GT: number
    const CMP_GE: number
    const CMP_LT: number
    const CMP_LE: number
    const CMP_NE: number

    // threshold 관련 상수들
    const THRESH_BINARY: number
    const THRESH_BINARY_INV: number
    const THRESH_TRUNC: number
    const THRESH_TOZERO: number
    const THRESH_TOZERO_INV: number
    const THRESH_MASK: number
    const THRESH_OTSU: number
    const THRESH_TRIANGLE: number
    const compare: (src1: Mat, src2: Mat, dst: Mat, cmpop: number) => void

    const extractChannel: (src: Mat, dst: Mat, channel: number) => void
    // 주요 함수들
    const imread: (canvas: HTMLCanvasElement) => Mat
    const subtract: (
      src1: Mat,
      src2: Mat,
      dst: Mat,
      mask?: Mat,
      dtype?: number
    ) => void

    const imshow: (canvasId: string | HTMLCanvasElement, mat: Mat) => void
    const normalize: (
      src: Mat,
      dst: Mat,
      alpha: number,
      beta: number,
      norm_type: number,
      dtype?: number
    ) => void
    const sqrt: (src: Mat, dst: Mat) => void
    const GaussianBlur: (
      src: Mat,
      dst: Mat,
      ksize: Size,
      sigmaX: number,
      sigmaY?: number
    ) => void
    const multiply: (src1: Mat, src2: Mat, dst: Mat, scale?: number) => void
    const pow: (src: Mat, power: number, dst: Mat) => void
    const add: (src1: Mat, src2: Mat, dst: Mat) => void
    const merge: (mv: MatVector, dst: Mat) => void
    const split: (src: Mat, mv: MatVector) => void
    const cvtColor: (src: Mat, dst: Mat, code: number) => void
    const convertScaleAbs: (src: Mat, dst?: Mat, alpha?: number, beta?: number) => void
    const minMaxLoc: (src: Mat) => {
      minVal: number
      maxVal: number
      minLoc: Point
      maxLoc: Point
    }
    const circle: (
      img: Mat,
      center: Point,
      radius: number,
      color: Scalar,
      thickness?: number,
      lineType?: number,
      shift?: number
    ) => void
    const countNonZero: (src: Mat) => number
    const inRange: (src: Mat, lowerb: Scalar, upperb: Scalar, dst: Mat) => void
    // threshold 함수
    const threshold: (
      src: Mat,
      dst: Mat,
      thresh: number,
      maxval: number,
      type: number
    ) => void
    // 비트 연산 함수
    const bitwise_and: (src1: Mat, src2: Mat, dst: Mat, mask?: Mat) => void
    const absdiff: (src1: Mat, src2: Mat, dst: Mat) => void
    const divide: (src1: Mat, src2: Mat, dst: Mat, scale?: number) => void
    // 이미지 리사이즈
    function resize(
      src: Mat,
      dst: Mat,
      dsize: Size,
      fx?: number,
      fy?: number,
      interpolation?: number
    ): void
    // 보간법 상수
    const INTER_LINEAR: number

    // 임계값
    const threshold: (
      src: Mat,
      dst: Mat,
      thresh: number,
      maxVal: number,
      type: number
    ) => void
    const THRESH_TRUNC: number
    const THRESH_BINARY: number

    const bitwise_or: (src1: Mat, src2: Mat, dst: Mat) => void
    const bitwise_not: (src: Mat, dst: Mat) => void
  }

  const cv: typeof cv
}

export {}
