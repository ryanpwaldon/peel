import { useState } from 'react'
import { isSameHour } from 'date-fns'
import { motion } from 'framer-motion'
import { vibrate } from '@/utils/vibrate'
import { getTzStartOfDay } from '@peel/utils'
import Symbol from '@/components/Symbol/Symbol'
import { findIndexOrNull } from '@/utils/findIndexOrNull'

const MILLISECONDS_IN_DAY = 86400000

interface ForecastChartProps {
  title?: string
  symbol?: string
  customTitle?: React.ReactNode
  sunrise: Date | null
  sunset: Date | null
  timezone: string
  ticks: Tick[]
  hoveredTick: number | null
  setHoveredTick: (tick: number | null) => void
  className?: string
}

interface Tick {
  time: Date
  color: string
  height: string
  label: React.ReactNode
}

export default function ForecastChart({
  title = 'Forecast',
  symbol = 'beach_access',
  customTitle,
  ticks,
  timezone,
  sunrise,
  sunset,
  hoveredTick,
  setHoveredTick,
  className,
}: ForecastChartProps) {
  const liveTick = findIndexOrNull(ticks, (tick) => isSameHour(tick.time, new Date()))
  const hasLiveTick = liveTick !== null

  const barsToHighlight = ticks.reduce((acc, _, index) => (hasLiveTick && liveTick <= index ? [...acc, index] : acc), [] as number[])
  const labelsToHighlight = hasLiveTick ? [liveTick] : ticks.reduce((acc, _, index) => (index % 6 === 0 ? [...acc, index] : acc), [] as number[])

  const localStartOfDay = getTzStartOfDay(timezone, ticks[0]?.time)
  const sunriseOffset = sunrise ? ((sunrise.getTime() - localStartOfDay.getTime()) / MILLISECONDS_IN_DAY) * 100 : null
  const sunsetOffset = sunset ? ((sunset.getTime() - localStartOfDay.getTime()) / MILLISECONDS_IN_DAY) * 100 : null

  const [initialY, setInitialY] = useState<number | null>(null)

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (initialY === null) setInitialY(event.clientY)
    const element = document.elementFromPoint(event.clientX, initialY || event.clientY)
    const elementIndex = parseInt(element?.getAttribute('data-index') || '')
    if (Number.isInteger(elementIndex) && elementIndex !== hoveredTick) {
      setHoveredTick(elementIndex)
      vibrate()
    }
  }

  const onPointerOut = () => {
    setInitialY(null)
    setHoveredTick(null)
  }

  return (
    <div className={`relative w-full overflow-hidden bg-white ${className}`}>
      <motion.div className="relative z-10 flex w-full touch-none" onPointerMove={onPointerMove} onPointerOut={onPointerOut}>
        {ticks.map((tick, index) => {
          const isFirst = index === 0
          const isLast = index === ticks.length - 1
          const alignLabel = index > ticks.length - ticks.length / 4 ? 'items-end' : ''
          return (
            <div
              key={index}
              data-index={index}
              className={`relative flex w-full min-w-0 flex-col justify-end px-0.5 py-3 ${isFirst ? 'pl-5' : ''} ${isLast ? 'pr-5' : ''}`}
            >
              {index === 0 && (
                <div className="pointer-events-none mb-2 flex text-xs text-gray-500">
                  {customTitle || (
                    <>
                      <span>{title}</span>
                      <span>&nbsp;</span>
                      <Symbol symbol={symbol} />
                    </>
                  )}
                </div>
              )}
              <div className="pointer-events-none flex h-8 items-end">
                <motion.div
                  className="w-full rounded"
                  transition={{ duration: 0 }}
                  style={{ height: tick.height, backgroundColor: tick.color }}
                  animate={{ opacity: typeof hoveredTick === 'number' ? (hoveredTick === index ? 1 : 0.2) : barsToHighlight.includes(index) ? 1 : 0.2 }}
                />
              </div>
              <motion.div
                transition={{ duration: 0 }}
                className={`pointer-events-none mt-1 flex w-full flex-col whitespace-nowrap text-xs font-medium opacity-0 ${alignLabel}`}
                animate={{ opacity: typeof hoveredTick === 'number' ? (hoveredTick === index ? 1 : 0) : labelsToHighlight.includes(index) ? 1 : 0 }}
              >
                {tick.label}
              </motion.div>
            </div>
          )
        })}
      </motion.div>
      {sunriseOffset && sunsetOffset && (
        <div className="pointer-events-none absolute left-0 top-0 z-0 h-full w-full px-5">
          <div className="h-full w-full px-[calc(((100%_-_(4px_*_(24_-_1)))_/_24)_/_2)]">
            <div className="relative z-10 h-full w-full" style={{ paddingLeft: sunriseOffset + '%', paddingRight: 100 - sunsetOffset + '%' }}>
              <div className="h-full w-full border-x-hairline border-gray-200 bg-white" />
            </div>
          </div>
          <div className="absolute top-0 left-0 z-0 h-full w-full bg-gray-50" />
        </div>
      )}
    </div>
  )
}
