export const getPeriodDate = (period: number) => {
  const today = new Date()
  const thirtyOneDaysLater = new Date(
    today.getTime() + period * 24 * 60 * 60 * 1000
  )

  return { today, thirtyOneDaysLater }
}
