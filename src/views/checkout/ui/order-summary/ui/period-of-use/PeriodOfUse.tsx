import { formattedDate, getPeriodDate } from './lib'

const PERIOD = 30

export const PeriodOfUse = () => {
  const today = new Date()
  const periodLater = getPeriodDate(today, PERIOD)

  const formattedToday = formattedDate(today)
  const formattedPeriodLater = formattedDate(periodLater)

  return `${formattedToday} - ${formattedPeriodLater}`
}
