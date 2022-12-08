import { isSameHour } from 'date-fns'
import { PointerEvent, TouchEvent, TouchEventHandler, useRef, useState } from 'react'
import { vibrate } from '@/utils/vibrate'
import { getTzStartOfDay } from '@peel/utils'
import Symbol from '@/components/Symbol/Symbol'
import { motion, PanHandlers } from 'framer-motion'
import { findIndexOrNull } from '@/utils/findIndexOrNull'

const MILLISECONDS_IN_DAY = 86400000

interface ForecastChartProps {
  title?: string
  symbol?: string
  renderCustomTitle?: (activeTick: number | null) => React.ReactNode
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
  renderCustomTitle,
  ticks,
  timezone,
  sunrise,
  sunset,
  hoveredTick,
  setHoveredTick,
  className,
}: ForecastChartProps) {
  const liveTick = findIndexOrNull(ticks, (tick) => isSameHour(tick.time, new Date()))
  const activeTick = hoveredTick ?? liveTick

  const hasActiveTick = activeTick !== null
  const hasHoveredTick = hoveredTick !== null

  const customTitle = renderCustomTitle ? renderCustomTitle(activeTick) : null

  const barsToHighlight = hasHoveredTick ? [hoveredTick] : ticks.reduce((acc, _, index) => ((liveTick ?? 0) <= index ? [...acc, index] : acc), [] as number[])
  const labelsToHighlight = hasActiveTick ? [activeTick] : ticks.reduce((acc, _, index) => (index % 6 === 0 ? [...acc, index] : acc), [] as number[])

  const localStartOfDay = getTzStartOfDay(timezone, ticks[0]?.time)
  const sunriseOffset = sunrise ? ((sunrise.getTime() - localStartOfDay.getTime()) / MILLISECONDS_IN_DAY) * 100 : null
  const sunsetOffset = sunset ? ((sunset.getTime() - localStartOfDay.getTime()) / MILLISECONDS_IN_DAY) * 100 : null

  const container = useRef<HTMLDivElement>(null)
  const isLongPressTimer = useRef<NodeJS.Timeout | null>(null)
  const [isLongPressed, setIsLongPressed] = useState(false)
  const [initialY, setInitialY] = useState<number | null>(null)

  const onTouchStart = (event: PointerEvent<HTMLDivElement>) => {
    isLongPressTimer.current = setTimeout(() => {
      console.log('long press')
      container.current?.releasePointerCapture(event.pointerId)
      container.current?.classList.add('touch-none')
      container.current?.classList.remove('touch-pan-y')
      container.current?.setPointerCapture(event.pointerId)
      setIsLongPressed(true)
      onPan(true, event.clientX, event.clientY)
    }, 200)
  }

  const onPan = (isLongPressed: boolean, x: number, y: number) => {
    if (!isLongPressed) return cancel()
    if (initialY === null) setInitialY(y)
    const element = document.elementFromPoint(x, initialY || y)
    const elementIndex = parseInt(element?.getAttribute('data-index') || '')
    if (Number.isInteger(elementIndex) && elementIndex !== hoveredTick) {
      setHoveredTick(elementIndex)
      vibrate()
    }
  }

  const cancel = () => {
    console.log('cancelled')
    setIsLongPressed(false)
    setHoveredTick(null)
    setInitialY(null)
    container.current?.classList.add('touch-pan-y')
    container.current?.classList.remove('touch-none')
    isLongPressTimer.current && clearTimeout(isLongPressTimer.current)
  }

  return (
    <div className={`relative w-full overflow-hidden bg-white ${className}`}>
      <motion.div
        ref={container}
        className={`relative z-10 flex w-full`}
        onPointerDown={onTouchStart}
        onTap={cancel}
        onTapCancel={cancel}
        onPan={(_, info) => onPan(isLongPressed, info.point.x, info.point.y)}
      >
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
                  animate={{ opacity: barsToHighlight.includes(index) ? 1 : 0.2 }}
                />
              </div>
              <motion.div
                transition={{ duration: 0 }}
                className={`pointer-events-none mt-1 flex w-full flex-col whitespace-nowrap text-xs font-medium opacity-0 ${alignLabel}`}
                animate={{ opacity: labelsToHighlight.includes(index) ? 1 : 0 }}
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
