import { useState } from 'react'
import { isEqual } from 'date-fns'
import { motion } from 'framer-motion'
import { closestIndexTo } from 'date-fns/esm'
import { getTzStartOfDay } from '@peel/utils'
import Symbol from '@/components/Symbol/Symbol'

interface ForecastChartProps {
  title: string
  symbol: string
  ticks: Tick[]
  timezone: string
  className?: string
}

interface Tick {
  time: Date
  color: string
  height: string
  label: React.ReactNode
}

export default function ForecastChart({ title, symbol, ticks, timezone, className }: ForecastChartProps) {
  const isToday = ticks[0]?.time && isEqual(ticks[0]?.time, getTzStartOfDay(timezone))
  const liveTick = isToday ? closestIndexTo(new Date(), ticks.map((tick) => tick.time)) : null // prettier-ignore

  const barsToHighlight = ticks.reduce((acc, _, index) => ((liveTick || 0) <= index ? [...acc, index] : acc), [] as number[])
  const labelsToHighlight = liveTick ? [liveTick] : ticks.reduce((acc, _, index) => (index % 6 === 0 ? [...acc, index] : acc), [] as number[])

  const [hoveredTick, setHoveredTick] = useState<number | null>(null)

  return (
    <div className={`relative w-full overflow-hidden bg-white ${className}`}>
      <div className="pointer-events-none absolute top-3 left-5 flex text-xs text-gray-500">
        <span>{title}</span>
        <span>&nbsp;</span>
        <Symbol symbol={symbol} />
      </div>
      <div className="flex w-full">
        {ticks.map((tick, index) => {
          const isFirst = index === 0
          const isLast = index === ticks.length - 1
          const alignLabel = index > ticks.length - ticks.length / 4 ? 'items-end' : ''
          return (
            <motion.div
              key={index}
              onHoverEnd={() => setHoveredTick(null)}
              onHoverStart={() => setHoveredTick(index)}
              className={`relative w-full min-w-0 px-0.5 pb-3 pt-9 ${isFirst ? 'pl-5' : ''} ${isLast ? 'pr-5' : ''}`}
            >
              <div className="flex h-8 items-end">
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
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
