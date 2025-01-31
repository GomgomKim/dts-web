'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

import { Button } from '@/shared/ui'

import dahye from '/public/images/dahye-1_1-FRONT-watermark.webp'
import dayoung from '/public/images/dayoung-1_1-FRONT-watermark.webp'
import yewon from '/public/images/yewon-1_1-FRONT-watermark.webp'
import yuna from '/public/images/yuna-1_1-FRONT-watermark.webp'

import './styles.css'
import { EmptyCardItem, ModelCardItem } from './ui'

const DUMMY_DATA = [
  {
    name: 'dayoung',
    endDate: '2023.06.30',
    thumbnail: dayoung,
    isActive: true
  },
  {
    name: 'yuna',
    endDate: '2023.06.30',
    thumbnail: yuna,
    isActive: true
  },
  {
    name: 'yewon',
    endDate: '2023.06.30',
    thumbnail: yewon,
    isActive: false
  },
  {
    name: 'dahye',
    endDate: '2023.06.30',
    thumbnail: dahye,
    isActive: false
  }
]

interface ModelCardItemsProps {
  isSubscribing: boolean
}

export const ModelCardItems = (props: ModelCardItemsProps) => {
  const searchParams = useSearchParams()
  const currentTagType = searchParams.get('tagType') // TODO: type 구체화

  // 마크업을 위한 더미 데이터
  type SubscriptionPlan = '5 Models' | 'Unlimited' | string
  const currentSubscriptionPlan: SubscriptionPlan = '5 Models'
  const isUnlimitedPlan = currentSubscriptionPlan === 'Unlimited'
  const maxAllowedActiveModels = isUnlimitedPlan
    ? 0 // infinity
    : parseInt(currentSubscriptionPlan[0]) // TODO: api 인터페이스 나오면 첫 글자로 모델 수 파악하는 로직 자체 변경
  const currentActiveModelCount = 2
  const remainingActiveModelCount = isUnlimitedPlan
    ? 0 // infinity
    : maxAllowedActiveModels - currentActiveModelCount
  const blankCardLength = isUnlimitedPlan ? 1 : remainingActiveModelCount

  // 활성화된 모델 카드 렌더링
  const renderActiveModels = () => {
    if (currentTagType === 'INACTIVE') return null

    const isShowUpgradeCard =
      currentTagType === 'ACTIVE' &&
      !isUnlimitedPlan &&
      !remainingActiveModelCount

    return (
      <>
        {DUMMY_DATA.slice(0, currentActiveModelCount).map((item, idx) => (
          <ModelCardItem key={idx} {...item} />
        ))}
        {/* blank card */}
        {/* All, Active 탭에서
         * 브라우즈 모델 카드
         * 모델 활성화 횟수 남아있는 경우, unlimited 플랜이면 1개만 노출
         */}
        {Array.from({ length: blankCardLength }).map((_value, idx) => (
          <EmptyCardItem
            key={idx}
            contents={
              isUnlimitedPlan
                ? 'Unlimited'
                : `${currentActiveModelCount + idx + 1} / ${currentSubscriptionPlan}`
            }
            slot={
              <Button stretch className="font-semibold" asChild>
                <Link href="/explore">Browse Models</Link>
              </Button>
            }
          />
        ))}
        {/* Active 탭에서
         * 업그레이드 플랜 카드
         * unlimited가 아니고, 모델 활성화 횟수 소진한 경우
         * */}
        {isShowUpgradeCard ? (
          <EmptyCardItem
            contents="Unlock More Models with an Upgrade"
            slot={
              <Button stretch className="font-semibold" asChild>
                <Link href="/pricing">Upgrade Plan</Link>
              </Button>
            }
          />
        ) : null}
      </>
    )
  }

  // 비활성화된 모델 카드 렌더링
  const renderInactiveModels = () => {
    if (currentTagType === 'ACTIVE') return null

    return DUMMY_DATA.slice(2).map((item, idx) => (
      <ModelCardItem key={idx} {...item} isHoverable={!props.isSubscribing} />
    ))
  }

  return (
    <div className="grid-models-small md:grid-models-medium lg:grid-models-xlarge">
      {renderActiveModels()}
      {renderInactiveModels()}
    </div>
  )
}
