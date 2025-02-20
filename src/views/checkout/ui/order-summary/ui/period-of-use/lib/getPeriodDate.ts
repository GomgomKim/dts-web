export const getPeriodDate = (today: Date, period: number) => {
  const periodLater = new Date(today)
  periodLater.setDate(today.getDate() + period)

  return periodLater
}
