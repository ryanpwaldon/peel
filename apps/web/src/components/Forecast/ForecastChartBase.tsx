import { useMemo, useState } from 'react'
import { RouterOutputs } from '@/utils/trpc'
import { getTzStartOfDay } from '@peel/utils'
import { closestIndexTo, isEqual } from 'date-fns'

interface Tick {
  time: Date
  color: string
  height: string
  label: (alignment: 'right' | 'left') => React.ReactNode
}

interface ForecastSegment {
  title: React.ReactNode
  ticks: Tick[]
  timezone: string
  solarEvents: RouterOutputs['wave']['findById']['point']['forecast']['solarEvents']
  className?: string
}

const getLiveTick = (ticks: Tick[]) => {
  return closestIndexTo(
    new Date(),
    ticks.map((tick) => tick.time),
  ) as number
}

const getIsToday = (ticks: Tick[], timezone: string) => {
  const firstTick = ticks[0]
  const localStartOfDay = getTzStartOfDay(timezone)
  if (!firstTick) throw new Error('Ticks array is empty.')
  return isEqual(firstTick.time, localStartOfDay)
}

const getTickOpacity = (isToday: boolean, currentTickIndex: number, liveTickIndex: number) => {
  return isToday && currentTickIndex < liveTickIndex ? 'opacity-20' : 'opacity-100'
}

const getTickLabelVisibility = (isToday: boolean, currentTickIndex: number, liveTickIndex: number) => {
  return isToday ? (currentTickIndex !== liveTickIndex ? 'hidden' : '') : currentTickIndex % 6 !== 0 ? 'hidden' : ''
}

const getTickLabelAlignment = (currentTickIndex: number) => {
  return currentTickIndex < 12 ? 'left' : 'right'
}

const getSunriseSolarOffsets = (ticks: Tick[], solarEvents: ForecastSegment['solarEvents']) => {
  const startUnix = ticks[0]?.time.getTime() || 0
  const endUnix = ticks[ticks.length - 1]?.time.getTime() || 0
  const forecastDuration = endUnix - startUnix
  const sunriseUnix = solarEvents.find((event) => event.type === 'SUNRISE')?.time.getTime() || 0
  const sunsetUnix = solarEvents.find((event) => event.type === 'SUNSET')?.time.getTime() || 0
  const sunriseOffset = ((sunriseUnix - startUnix) / forecastDuration) * 100
  const sunsetOffset = ((sunsetUnix - startUnix) / forecastDuration) * 100
  return {
    sunriseOffset,
    sunsetOffset,
  }
}

export default function ForecastChartBase({ title, ticks, timezone, solarEvents, className }: ForecastSegment) {
  const [isToday, setIsToday] = useState(getIsToday(ticks, timezone))
  const [liveTickIndex, setLiveTickIndex] = useState(getLiveTick(ticks))
  const { sunriseOffset, sunsetOffset } = getSunriseSolarOffsets(ticks, solarEvents)

  useMemo(() => {
    const timer = setTimeout(() => {
      setIsToday(getIsToday(ticks, timezone))
      setLiveTickIndex(getLiveTick(ticks))
    }, 1000)
    return () => clearTimeout(timer)
  }, [ticks, timezone])

  return (
    <div className="relative bg-white">
      <div className={`relative z-10 flex w-full flex-col overflow-hidden px-5 py-3 ${className}`}>
        <div>{title}</div>
        <div className="mt-2 grid w-full auto-cols-fr grid-flow-col gap-1">
          {ticks.map((tick, currentTickIndex) => {
            const tickOpacity = getTickOpacity(isToday, currentTickIndex, liveTickIndex)
            const tickLabelVisibility = getTickLabelVisibility(isToday, currentTickIndex, liveTickIndex)
            const tickLabelAlignment = getTickLabelAlignment(currentTickIndex)
            return (
              <div key={currentTickIndex} className={tickOpacity}>
                <div className="flex h-8 items-end">
                  <div className="w-full rounded" style={{ height: tick.height, backgroundColor: tick.color }} />
                </div>
                <div className={`mt-1 ${tickLabelVisibility}`}>{tick.label(tickLabelAlignment)}</div>
              </div>
            )
          })}
        </div>
      </div>
      <div className="absolute top-0 left-0 z-0 h-full w-full px-5">
        <div className="h-full w-full px-[calc(((100%_-_(4px_*_(24_-_1)))_/_24)_/_2)]">
          <div className="relative z-10 h-full w-full" style={{ paddingLeft: sunriseOffset + '%', paddingRight: 100 - sunsetOffset + '%' }}>
            <div className="h-full w-full border-x-hairline border-gray-200 bg-white" />
          </div>
        </div>
        <div className="absolute top-0 left-0 z-0 h-full w-full bg-gray-50" />
      </div>
    </div>
  )
}
