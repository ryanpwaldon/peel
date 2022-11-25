export const swellHeightToCardinal = (height: number | null) => {
  if (height === null) return null
  if (height < 1) return 'Flat'
  if (height < 2.5) return 'Small'
  if (height < 4) return 'Moderate'
  return 'Large'
}
