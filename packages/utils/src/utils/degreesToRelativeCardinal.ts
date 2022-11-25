const CROSSWIND_THRESHOLD = 20

export const degreesToRelativeCardinal = (base: number, degrees: number | null) => {
  if (degrees === null) return null
  const diff = Math.abs(base - degrees)
  if (diff < 90 - CROSSWIND_THRESHOLD || diff > 270 + CROSSWIND_THRESHOLD) return 'Offshore' as const
  if (diff > 90 + CROSSWIND_THRESHOLD && diff < 270 - CROSSWIND_THRESHOLD) return 'Onshore' as const
  return 'Crosswind' as const
}
