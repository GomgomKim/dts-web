import { UI_TEXT } from './model/constants'
import { PlanItems } from './ui/plan-Items'

export default function Pricing() {
  return (
    <>
      <h1 className="m-auto mb-5 mt-12 text-center text-[2.5rem] font-semibold">
        {UI_TEXT.FIND_YOUR_IDEAL_PLAN}
      </h1>
      <p className="mb-16 text-center text-[1.25rem] font-medium text-neutral-7">
        {UI_TEXT.PLAN_DESCRIPTION}
      </p>
      <div className="mb-40 px-20 lg:px-40">
        <PlanItems />
      </div>
    </>
  )
}
