const swellPeriodToCardinal = (period: number | null) => {
  if (period === null) return null
  if (period < 8) return 'SHORT' as const
  if (period < 14) return 'MODERATE' as const
  return 'LONG' as const
}

export const swellPeriodToCardinalText = (period: number | null) => {
  const cardinal = swellPeriodToCardinal(period)
  switch (cardinal) {
    case 'SHORT':
      return 'Short'
    case 'MODERATE':
      return 'Moderate'
    case 'LONG':
      return 'Long'
    case null:
      return null
  }
}

export const swellPeriodToCardinalColor = (period: number | null) => {
  const cardinal = swellPeriodToCardinal(period)
  switch (cardinal) {
    case 'SHORT':
      return '#bfdbfe'
    case 'MODERATE':
      return '#60a5fa'
    case 'LONG':
      return '#2563eb'
    case null:
      return '#e5e5e5'
  }
}
