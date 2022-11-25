export const metersToFeet = (meters: number | null) => {
  return meters === null ? 0 : Math.round(meters * 3.28084)
}
