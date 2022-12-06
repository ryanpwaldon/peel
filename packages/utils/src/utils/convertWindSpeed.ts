import type { WindSpeedUnit } from '@peel/db'

const msToKmh = (metersPerSecond: number | null) => {
  return metersPerSecond === null ? 0 : Math.round(metersPerSecond * 3.6)
}

const msToMph = (metersPerSecond: number | null) => {
  return metersPerSecond === null ? 0 : Math.round(metersPerSecond * 2.23694)
}

const msToKt = (metersPerSecond: number | null) => {
  return metersPerSecond === null ? 0 : Math.round(metersPerSecond * 1.94384)
}

export const convertWindSpeed = (metersPerSecond: number | null, unit: WindSpeedUnit) => {
  switch (unit) {
    case 'MS':
      return { value: metersPerSecond, unit: 'ms' }
    case 'KMH':
      return { value: msToKmh(metersPerSecond), unit: 'kmh' }
    case 'MPH':
      return { value: msToMph(metersPerSecond), unit: 'mph' }
    case 'KT':
      return { value: msToKt(metersPerSecond), unit: 'kt' }
  }
}
