import { useMemo, useState } from 'react'
import { getTzStartOfDay } from '@peel/utils'
import { closestIndexTo, isEqual } from 'date-fns'

interface Tick {
  time: Date
  color: string
  height: string
  label: React.ReactNode
}

interface ForecastSegment {
  title: React.ReactNode
  ticks: Tick[]
  timezone: string
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

const getTickOpacity = (isToday: boolean, tickIndex: number, liveTickIndex: number) => {
  return isToday && tickIndex < liveTickIndex ? 'opacity-20' : 'opacity-100'
}

const getTickLabelVisibility = (isToday: boolean, tickIndex: number, liveTickIndex: number) => {
  return isToday ? (tickIndex !== liveTickIndex ? 'hidden' : '') : tickIndex % 6 !== 0 ? 'hidden' : ''
}

export default function ForecastChartBase({ title, ticks, timezone, className }: ForecastSegment) {
  const [isToday, setIsToday] = useState(getIsToday(ticks, timezone))
  const [liveTickIndex, setLiveTickIndex] = useState(getLiveTick(ticks))

  useMemo(() => {
    const timer = setTimeout(() => {
      setIsToday(getIsToday(ticks, timezone))
      setLiveTickIndex(getLiveTick(ticks))
    }, 1000)
    return () => clearTimeout(timer)
  }, [ticks, timezone])

  return (
    <div className={`flex w-full flex-col overflow-hidden bg-white px-5 py-3 ${className}`}>
      <div>{title}</div>
      <div className="mt-2 grid w-full auto-cols-fr grid-flow-col gap-1">
        {ticks.map((tick, index) => {
          const tickOpacity = getTickOpacity(isToday, index, liveTickIndex)
          const tickLabelVisibility = getTickLabelVisibility(isToday, index, liveTickIndex)
          return (
            <div key={index} className={tickOpacity}>
              <div className="flex h-8 items-end">
                <div className="w-full rounded" style={{ height: tick.height, backgroundColor: tick.color }} />
              </div>
              <div className={`mt-1 ${tickLabelVisibility}`}>{tick.label}</div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
