import type { TideHeightUnit } from '@peel/db'

const metersToFeet = (meters: number | null) => {
  return Math.round((meters ?? 0) * 3.28084 * 100) / 100
}

export const convertTideHeight = (meters: number | null, unit: TideHeightUnit) => {
  switch (unit) {
    case 'FT':
      return { value: metersToFeet(meters), unit: 'ft' }
    case 'M':
      return { value: Math.round((meters ?? 0) * 100) / 100, unit: 'm' }
  }
}
