import { FilterTagTypes } from '@/features/filter-tag-types'

import { BackButton } from '@/entities/back-button'

import { TAG_TYPES, UI_TEXT } from './model/constants'
import { ModelCardItems, PromotionBanner } from './ui'

export default function MyAccountMyModels() {
  const isSubscribing = false
  return (
    <>
      <BackButton />
      <h1 className="mb-3 mt-5 text-[2rem] font-semibold">
        {UI_TEXT.MY_MODELS}
      </h1>
      <div className="text-[1.5rem] font-semibold text-neutral-7">
        2 / 5 Models
      </div>
      <div className="mb-5 mt-10">
        <FilterTagTypes filterList={TAG_TYPES} />
      </div>
      <ModelCardItems isSubscribing={isSubscribing} />
      {/* PromotionBanner TODO:
       * - 전체 모델 데이터가 6개 이하인 경우만 노출
       * - 구독권이 활성화된 상태에만 해당
       * - 구독권 없는 경우 Active인 상태에서 항상 노출  */}
      <div className="mt-16">
        <PromotionBanner isSubscribing={isSubscribing} />
      </div>
    </>
  )
}
