import { useColorBrushStore } from '@/views/canvas/model/useEditorPanelsStore'

interface UseCanvasHighlightProps {
  canvasRef: React.RefObject<HTMLCanvasElement>
  maskMatRef: React.RefObject<cv.Mat | null>
}

interface DrawHighlightProps {
  showHighlight: boolean
}

export const useCanvasHighlight = (props: UseCanvasHighlightProps) => {
  const selectedColorBrushItem = useColorBrushStore(
    (state) => state.selectedColorBrushItem
  )

  const drawHighlight = (innerProps: DrawHighlightProps) => {
    if (!props.canvasRef?.current || !props.maskMatRef?.current) return
    const mainCanvas = props.canvasRef.current

    if (!mainCanvas || !props.maskMatRef.current) return

    const ctx = mainCanvas.getContext('2d')
    if (!ctx) return

    ctx.clearRect(0, 0, mainCanvas.width, mainCanvas.height)

    if (!innerProps.showHighlight) return

    // 선택된 브러시의 세그먼트들만 하이라이트
    const segmentsToHighlight = selectedColorBrushItem?.segments ?? []
    if (segmentsToHighlight.length > 0) {
      for (let i = 0; i < props.maskMatRef.current.rows; i++) {
        for (let j = 0; j < props.maskMatRef.current.cols; j++) {
          const val = props.maskMatRef.current.ucharAt(i, j)
          if (segmentsToHighlight.includes(val)) {
            ctx.fillStyle = 'rgba(110, 255, 182, 0.3)'
            ctx.fillRect(j, i, 1, 1)
          }
        }
      }
    }
  }

  return { drawHighlight }
}
