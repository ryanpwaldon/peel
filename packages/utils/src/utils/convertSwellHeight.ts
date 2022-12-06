import type { SwellHeightUnit } from '@peel/db'

const metersToFeet = (meters: number | null) => {
  return meters === null ? 0 : Math.round(meters * 3.28084)
}

export const convertSwellHeight = (meters: number | null, unit: SwellHeightUnit) => {
  switch (unit) {
    case 'FT':
      return { value: metersToFeet(meters), unit: 'ft' }
    case 'M':
      return { value: Math.round(meters ?? 0), unit: 'm' }
  }
}
