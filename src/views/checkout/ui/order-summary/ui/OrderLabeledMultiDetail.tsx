import {
  LabeledDetail,
  LabeledDetailDetail,
  LabeledDetailLabel
} from '@/shared/ui/labeled-detail'

interface OrderLabeledMultiDetailProps {
  label: React.ReactNode
  detail_1: React.ReactNode
  detail_2: React.ReactNode
}

export const OrderLabeledMultiDetail = (
  props: OrderLabeledMultiDetailProps
) => {
  return (
    <LabeledDetail>
      <LabeledDetailLabel className="text-[1.125rem] font-normal text-white">
        {props.label}
      </LabeledDetailLabel>
      <LabeledDetailDetail>
        <div className="mb-1 text-right text-[1.125rem] font-normal text-white">
          {props.detail_1}
        </div>
        <div className="text-right text-[1rem] text-neutral-5">
          {props.detail_2}
        </div>
      </LabeledDetailDetail>
    </LabeledDetail>
  )
}
