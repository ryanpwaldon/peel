import { motion } from 'framer-motion'
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

export default function ForecastChart({ title, symbol, ticks, className }: ForecastChartProps) {
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
            <motion.div key={index} whileHover="hover" className={`relative w-full min-w-0 px-0.5 pb-3 pt-9 ${isFirst ? 'pl-5' : ''} ${isLast ? 'pr-5' : ''}`}>
              <div className="flex h-8 items-end">
                <motion.div
                  transition={{ duration: 0 }}
                  variants={{ hover: { opacity: 1 } }}
                  className="w-full rounded opacity-20"
                  style={{ height: tick.height, backgroundColor: tick.color }}
                />
              </div>
              <motion.div
                transition={{ duration: 0 }}
                variants={{ hover: { opacity: 1 } }}
                className={`pointer-events-none mt-1 flex w-full flex-col whitespace-nowrap text-xs font-medium opacity-0 ${alignLabel}`}
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
