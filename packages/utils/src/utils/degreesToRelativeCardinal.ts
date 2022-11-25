const CROSSWIND_THRESHOLD = 20

const degreesToRelativeCardinal = (base: number, degrees: number | null) => {
  if (degrees === null) return null
  const diff = Math.abs(base - degrees)
  if (diff < 90 - CROSSWIND_THRESHOLD || diff > 270 + CROSSWIND_THRESHOLD) return 'OFFSHORE' as const
  if (diff > 90 + CROSSWIND_THRESHOLD && diff < 270 - CROSSWIND_THRESHOLD) return 'ONSHORE' as const
  return 'CROSSWIND' as const
}

export const degreesToRelativeCardinalText = (base: number, degrees: number | null) => {
  const cardinal = degreesToRelativeCardinal(base, degrees)
  switch (cardinal) {
    case 'OFFSHORE':
      return 'Offshore'
    case 'ONSHORE':
      return 'Onshore'
    case 'CROSSWIND':
      return 'Crosswind'
    case null:
      return null
  }
}

export const degreesToRelativeCardinalColor = (base: number, degrees: number | null) => {
  const cardinal = degreesToRelativeCardinal(base, degrees)
  switch (cardinal) {
    case 'OFFSHORE':
      return '#a1d96c'
    case 'ONSHORE':
      return '#e37878'
    case 'CROSSWIND':
      return '#fbe774'
    case null:
      return '#e5e5e5'
  }
}
