'use client'

import { Button } from '@/shared/ui'
import useModals from '@/shared/ui/modal/model/Modals.hooks'

import {
  DowngradeModal,
  UpgradeModal
} from '../../../modals/plan-change-modals'
import { UI_TEXT } from '../../model/constant'
import { Plan } from '../../model/types'

interface PlanChangeButtonProps {
  myPlan: Plan
  selectedPlan: Plan
}

export const PlanChangeButton = (props: PlanChangeButtonProps) => {
  const { openModal } = useModals()

  const isUpgrade = props.selectedPlan.id > props.myPlan.id

  const handleClickPlanChange = () => {
    openModal(isUpgrade ? UpgradeModal : DowngradeModal, {
      myPlan: props.myPlan,
      selectedPlan: props.selectedPlan
    })
  }

  if (props.selectedPlan.name === 'UNLIMITED') {
    return (
      <Button
        variant="primary"
        size="small"
        stretch
        className="bg-white font-semibold hover:bg-white"
        onClick={handleClickPlanChange}
      >
        {UI_TEXT.GET_UNLIMITED_ACCESS}
      </Button>
    )
  }

  return (
    <Button
      variant="outline"
      size="small"
      stretch
      className="bg-inherit"
      onClick={handleClickPlanChange}
    >
      {isUpgrade ? UI_TEXT.UPGRADE_PLAN : UI_TEXT.DOWNGRADE_PLAN}
    </Button>
  )
}
