'use client'

import { useRouter, useSearchParams } from 'next/navigation'

import { ConfirmSelectionModal } from '@/entities/gallery-item/ui/private-button/ui/confirm-selection-modal'

import { useGetPlanInfo } from '@/shared/lib/hooks/useGetPlanInfo'
import { useAuthStore } from '@/shared/lib/stores/useAuthStore'
import useModals from '@/shared/ui/modal/model/Modals.hooks'

import { useGetMemberShip } from '../pricing/model/adapter'

export default function Generate() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const modelId = searchParams.get('id')

  const isAuth = useAuthStore((state) => state.isAuth)
  const { data: membershipData, isLoading } = useGetMemberShip()

  const { getPlanByName } = useGetPlanInfo()
  const { openModal } = useModals()

  if (isAuth === null) return null
  if (isAuth === false) {
    router.replace('/login')
    return
  }

  if (isLoading) return <div>get membership data Loading...</div>
  if (!membershipData) {
    throw new Error('membership data is undefined')
  }

  // 2.1 구독 플랜 확인
  if (membershipData.plan === null) {
    // TODO: 구독 없을 때 값 확인
    alert('plan 없음, redirect to pricing page')
    // router.replace('/pricing')
    return
  }

  const myPlan = getPlanByName(membershipData.plan)
  if (!myPlan) {
    throw new Error('my plan is undefined')
  }
  const myModelCount = membershipData.modelIds?.length ?? 0

  // unlimited plan
  if (myPlan?.modelNum === -1) {
    // select confirm 모달 띄우는지?
    alert('unlimited model')
    return <div>Generate page ...</div>
  }

  // 2.2 모델 활성화 상태 확인
  if (myModelCount < myPlan.modelNum) {
    if (membershipData.modelIds?.includes(Number(modelId))) {
      return <div>Generate page ...</div>
    }

    // TODO: api 연결
    openModal(ConfirmSelectionModal, {
      isCloseable: false,
      onClickCancel: () => {
        router.replace('/explore')
      },
      modelInfo: {
        id: 123,
        name: 'test',
        description: 'description',
        isFavorite: false,
        encryptedThumbnailPath: '',
        tags: [],
        features: []
      },
      plan: myPlan.name, // = membershipData.plan
      subscribingModelCount: membershipData.modelIds?.length ?? 0
    })
    return null
  }

  alert('redirect to pricing page')
  // router.replace('/pricing')

  return <div>Generate page ...</div>
}

/**
 * 1. 인증 확인
 *    - 인증되지 않은 경우, 로그인 페이지로 리다이렉트
 *
 * 2. 멤버십 정보 가져오기
 *    2.1 구독 플랜 확인
 *        - 구독이 없는 경우(null), 가격 페이지로 리다이렉트
 *
 *    2.2 모델 활성화 상태 확인
 *        - 활성화된 경우: generate 페이지 데이터 가져오기
 *        - 비활성화 상태이지만 활성화 가능한 경우:
 *          a. 확인 모달 열기
 *          b. 모델 정보 데이터 가져오기
 *          c. 확인 클릭 시, 멤버십 업데이트 후 생성 페이지로 리다이렉트
 *             취소 클릭 시, explore 페이지로 리다이렉트
 *        - 비활성화 상태이고 활성화 불가능한 경우: 가격 페이지로 리다이렉트
 */
