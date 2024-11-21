export interface Box extends React.ComponentProps<'div'> {
  id: string
  createdAt: number
  image: string
  centerX: number // 중심 X 좌표 (상위 컨테이너 중심으로부터의 상대적 위치)
  centerY: number // 중심 Y 좌표 (상위 컨테이너 중심으로부터의 상대적 위치)
  width: number
  height: number
}
