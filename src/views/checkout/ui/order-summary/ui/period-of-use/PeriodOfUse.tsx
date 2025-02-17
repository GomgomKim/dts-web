import { formattedDate, getPeriodDate } from './lib'

const PERIOD = 30

export const PeriodOfUse = () => {
  const { today, thirtyOneDaysLater } = getPeriodDate(PERIOD)

  const formattedToday = formattedDate(today)
  const formattedThirtyOneDaysLater = formattedDate(thirtyOneDaysLater)

  return `${formattedToday} - ${formattedThirtyOneDaysLater}`
}
