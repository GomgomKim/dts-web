interface UseHairHighlightProps {
  canvasRef: React.RefObject<HTMLCanvasElement>
  maskMatRef: React.RefObject<cv.Mat | null>
}

interface DrawHighlightProps {
  showHighlight: boolean
}

export const useHairHighlight = (props: UseHairHighlightProps) => {
  const drawHairHighlight = (innerProps: DrawHighlightProps) => {
    if (!props.canvasRef?.current || !props.maskMatRef?.current) return
    const mainCanvas = props.canvasRef.current

    if (!mainCanvas || !props.maskMatRef.current) return

    const ctx = mainCanvas.getContext('2d')
    if (!ctx) return

    ctx.clearRect(0, 0, mainCanvas.width, mainCanvas.height)

    if (!innerProps.showHighlight) return

    for (let i = 0; i < props.maskMatRef.current.rows; i++) {
      for (let j = 0; j < props.maskMatRef.current.cols; j++) {
        const val = props.maskMatRef.current.ucharAt(i, j)
        if (val >= 40) {
          ctx.fillStyle = 'rgba(110, 255, 182, 0.3)'
          ctx.fillRect(j, i, 1, 1)
        }
      }
    }
  }

  return { drawHairHighlight }
}
