// 'use client'
import { Button } from '@/shared/ui'

import MinusIcon from '/public/icons/minus.svg'
import PlusIcon from '/public/icons/plus.svg'

interface ZoomButtonProps {
  canvasRef: React.RefObject<HTMLDivElement>
}

export const ZoomControls = (props: ZoomButtonProps) => {
  console.log(props.canvasRef)
  // const [scale, setScale] = useState<number>(1)
  // const [zoomStep, setZoomStep] = useState<number>(10)

  // const handleZoomIn = () => {
  //   setScale((prevScale) => Math.min(prevScale + zoomStep, 300))
  // }

  // const handleZoomOut = () => {
  //   setScale((prevScale) => Math.max(prevScale - zoomStep, 1))
  // }

  // const handleZoomStepChange = (e) => {
  //   setZoomStep(parseFloat(e.target.value))
  // }

  // useEffect(() => {
  //   if (props.canvasRef.current) {
  //     props.canvasRef.current.style.transform = `scale(${scale})`
  //     props.canvasRef.current.style.transition = 'transform 0.3s ease-in-out'
  //   }
  // }, [scale])

  return (
    <div
      id="zoom-controls"
      className="flex items-center gap-2 rounded-[.5rem] bg-[#202124] p-2 *:bg-[#202124]"
    >
      <Button onClick={() => {}} variant="ghost" className="p-0">
        <span className="flex size-6 items-center justify-center">
          <MinusIcon />
        </span>
      </Button>
      {/* TODO: % 단위 추가 */}
      <input
        type="number"
        value={100}
        // value={zoomStep}
        // onChange={handleZoomStepChange}
        step="10"
        min="1"
        max="300"
        className="w-12 text-center text-[0.875rem] text-white focus:outline-none"
      />
      <Button onClick={() => {}} variant="ghost" className="p-0">
        <span className="flex size-6 items-center justify-center">
          <PlusIcon width="16px" stroke="#AEAFB5" />
        </span>
      </Button>
    </div>
  )
}
