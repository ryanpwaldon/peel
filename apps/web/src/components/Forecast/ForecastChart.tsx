import { useState } from 'react'
import { isEqual } from 'date-fns'
import { motion } from 'framer-motion'
import { vibrate } from '@/utils/vibrate'
import { closestIndexTo } from 'date-fns/esm'
import { getTzStartOfDay } from '@peel/utils'
import Symbol from '@/components/Symbol/Symbol'

interface ForecastChartProps {
  title: string
  symbol: string
  ticks: Tick[]
  timezone: string
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

export default function ForecastChart({ title, symbol, ticks, timezone, hoveredTick, setHoveredTick, className }: ForecastChartProps) {
  const isToday = ticks[0]?.time && isEqual(ticks[0]?.time, getTzStartOfDay(timezone))
  const liveTick = isToday ? closestIndexTo(new Date(), ticks.map((tick) => tick.time)) : null // prettier-ignore

  const barsToHighlight = ticks.reduce((acc, _, index) => ((liveTick || 0) <= index ? [...acc, index] : acc), [] as number[])
  const labelsToHighlight = liveTick ? [liveTick] : ticks.reduce((acc, _, index) => (index % 6 === 0 ? [...acc, index] : acc), [] as number[])

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
      <div className="pointer-events-none absolute top-3 left-5 flex text-xs text-gray-500">
        <span>{title}</span>
        <span>&nbsp;</span>
        <Symbol symbol={symbol} />
      </div>
      <motion.div className="flex w-full touch-none" onPointerMove={onPointerMove} onPointerOut={onPointerOut}>
        {ticks.map((tick, index) => {
          const isFirst = index === 0
          const isLast = index === ticks.length - 1
          const alignLabel = index > ticks.length - ticks.length / 4 ? 'items-end' : ''
          return (
            <div key={index} data-index={index} className={`relative w-full min-w-0 px-0.5 pb-3 pt-9 ${isFirst ? 'pl-5' : ''} ${isLast ? 'pr-5' : ''}`}>
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
    </div>
  )
}
