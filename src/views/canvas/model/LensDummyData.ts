export const lensPositions = (ratio: string) => {
  switch (ratio) {
    case 'ASPECT_RATIO_1_1':
      return {
        left_eye: { xmin: 544, ymin: 454, xmax: 582, ymax: 496 },
        right_eye: { xmin: 749, ymin: 456, xmax: 785, ymax: 496 }
      }
    case 'ASPECT_RATIO_9_16':
      return {
        left_eye: { xmin: 100, xmax: 200, ymin: 100, ymax: 200 },
        right_eye: { xmin: 300, xmax: 400, ymin: 100, ymax: 200 }
      }
    default:
      return {
        left_eye: { xmin: 100, xmax: 200, ymin: 100, ymax: 200 },
        right_eye: { xmin: 300, xmax: 400, ymin: 100, ymax: 200 }
      }
  }
}
