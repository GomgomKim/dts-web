export const formattedDate = (date: Date) => {
  // "YYYY.MM.DD" 형식
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const rawFormattedDate = `${year}.${month}.${day}`

  // "YYYY. MM. DD" 형식으로 변환
  const finalFormattedDate = rawFormattedDate.replace(/\./g, '. ') // 모든 '.' 뒤에 공백 추가

  return finalFormattedDate
}
