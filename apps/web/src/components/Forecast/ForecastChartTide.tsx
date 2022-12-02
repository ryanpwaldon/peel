import { RouterOutputs } from '@/utils/trpc'
import Symbol from '@/components/Symbol/Symbol'
import ForecastChartBase from '@/components/Forecast/ForecastChartBase'

interface ForecastChartTideProps {
  className?: string
  timezone: string
  weatherEvents: RouterOutputs['wave']['findById']['point']['forecast']['weatherEvents']
}

export default function ForecastChartTide({ className, timezone, weatherEvents }: ForecastChartTideProps) {
  const tideUpperLimit = weatherEvents.reduce((acc, { seaLevel }) => Math.max(acc, seaLevel || 0), 0)

  return (
    <ForecastChartBase
      className={className}
      title={
        <div className="flex text-xs text-gray-500">
          <span>Tide</span>
          <span>&nbsp;</span>
          <Symbol symbol="height" />
        </div>
      }
      timezone={timezone}
      ticks={
        weatherEvents.map(({ time, seaLevel }, index) => {
          const prevSeaLevel = weatherEvents[index - 1]?.seaLevel
          const nextSeaLevel = weatherEvents[index + 1]?.seaLevel
          const tideDirection = seaLevel
            ? nextSeaLevel
              ? nextSeaLevel > seaLevel
                ? 'Rising'
                : 'Falling'
              : prevSeaLevel
              ? seaLevel > prevSeaLevel
                ? 'Rising'
                : 'Falling'
              : 'Unknown'
            : 'Unknown'
          const seaLevelRounded = Math.round((seaLevel || 0) * 100) / 100
          const tickHeight = `${(seaLevelRounded && Math.min((seaLevelRounded / tideUpperLimit) * 100, 100)) || 0}%`
          const tickLabel = (alignment: 'right' | 'left') => (
            <div className={`flex flex-col whitespace-nowrap text-xs font-medium ${alignment === 'left' ? 'items-start' : 'items-end'}`}>
              <div>
                <span>
                  {seaLevelRounded}
                  <span className="text-2xs">m</span>
                </span>
              </div>
              <div className="text-2xs text-gray-500">{tideDirection}</div>
            </div>
          )
          return {
            time,
            label: tickLabel,
            height: tickHeight,
            color: '#e5e5e5',
          }
        }) || []
      }
    />
  )
}
