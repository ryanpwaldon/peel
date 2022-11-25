import { startOfDay } from 'date-fns'
import { utcToZonedTime, zonedTimeToUtc } from 'date-fns-tz'

export const getTzStartOfDay = (timezone: string, time: Date = new Date()) => {
  const localTime = utcToZonedTime(time, timezone)
  const localTimeStartOfDay = startOfDay(localTime)
  const tzTimeStartOfDay = zonedTimeToUtc(localTimeStartOfDay, timezone)
  return tzTimeStartOfDay
}
