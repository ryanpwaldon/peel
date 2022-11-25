export const swellPeriodToCardinalText = (period: number | null) => {
  if (period === null) return null
  if (period < 8) return 'Short'
  if (period < 14) return 'Moderate'
  return 'Long'
}

export const swellPeriodToCardinalColor = (period: number | null) => {
  if (period === null) return '#e5e5e5'
  if (period < 8) return '#bfdbfe'
  if (period < 14) return '#60a5fa'
  return '#2563eb'
}
