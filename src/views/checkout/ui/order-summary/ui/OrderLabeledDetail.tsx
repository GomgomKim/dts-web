import {
  LabeledDetail,
  LabeledDetailDetail,
  LabeledDetailLabel
} from '@/shared/ui/labeled-detail'

interface OrderLabeledDetailProps {
  label: React.ReactNode
  detail: React.ReactNode
}

export const OrderLabeledDetail = (props: OrderLabeledDetailProps) => {
  return (
    <LabeledDetail>
      <LabeledDetailLabel className="text-[1.125rem] font-normal text-white">
        {props.label}
      </LabeledDetailLabel>
      <LabeledDetailDetail className="text-[1.125rem] font-normal text-white">
        {props.detail}
      </LabeledDetailDetail>
    </LabeledDetail>
  )
}
