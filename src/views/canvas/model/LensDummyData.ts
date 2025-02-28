export const lensPositions = (ratio: string) => {
  switch (ratio) {
    case 'ASPECT_RATIO_1_1':
      return {
        left_eye: { xmin: 564, ymin: 380, xmax: 598, ymax: 414 },
        right_eye: { xmin: 734, ymin: 407, xmax: 766, ymax: 439 }
      }
    case 'ASPECT_RATIO_9_16':
      return {
        left_eye: { xmin: 446, ymin: 347, xmax: 478, ymax: 381 },
        right_eye: { xmin: 276, ymin: 318, xmax: 310, ymax: 354 }
      }
    default:
      return {
        left_eye: { xmin: 734, ymin: 407, xmax: 766, ymax: 439 },
        right_eye: { xmin: 564, ymin: 380, xmax: 598, ymax: 414 }
      }
  }
}
