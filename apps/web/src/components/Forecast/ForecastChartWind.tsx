import { RouterOutputs } from '@/utils/trpc'
import Symbol from '@/components/Symbol/Symbol'
import ArrowDown from '@/components/Icon/ArrowDown'
import ForecastChartBase from '@/components/Forecast/ForecastChartBase'
import { degreesToCardinal, degreesToRelativeCardinalText, degreesToRelativeCardinalColor, mpsToKmh } from '@peel/utils'

interface ForecastChartWindProps {
  className?: string
  timezone: string
  offshoreWindDirection: RouterOutputs['wave']['findById']['offshoreWindDirection']
  weatherEvents: RouterOutputs['wave']['findById']['point']['forecast']['weatherEvents']
}

const WIND_SPEED_UPPER_LIMIT = 4

export default function ForecastChartWind({ className, timezone, weatherEvents, offshoreWindDirection }: ForecastChartWindProps) {
  return (
    <ForecastChartBase
      className={className}
      title={
        <div className="flex text-xs text-gray-500">
          <span>Wind</span>
          <span>&nbsp;</span>
          <Symbol symbol="air" />
        </div>
      }
      timezone={timezone}
      ticks={
        weatherEvents.map(({ time, windSpeed, windDirection }) => {
          const windSpeedConverted = mpsToKmh(windSpeed)
          const windCardinalDirection = degreesToCardinal(windDirection)
          const windRelativeCardinalDirectionText = degreesToRelativeCardinalText(offshoreWindDirection, windDirection)
          const windRelativeCardinalDirectionColor = degreesToRelativeCardinalColor(offshoreWindDirection, windDirection)
          const tickHeight = `${(windSpeed && Math.min((windSpeed / WIND_SPEED_UPPER_LIMIT) * 100, 100)) || 0}%`
          const tickLabel = (
            <div className="flex flex-col whitespace-nowrap font-medium">
              <div className="w-3" style={{ color: windRelativeCardinalDirectionColor }}>
                <ArrowDown className="w-full" rotate={windDirection} />
              </div>
              <div>
                <span className="text-xs">{windSpeedConverted}</span>
                <span className="text-2xs">kmh, {windCardinalDirection}</span>
              </div>
              <div className="text-2xs text-gray-500">{windRelativeCardinalDirectionText}</div>
            </div>
          )
          return {
            time,
            label: tickLabel,
            height: tickHeight,
            color: windRelativeCardinalDirectionColor,
          }
        }) || []
      }
    />
  )
}
