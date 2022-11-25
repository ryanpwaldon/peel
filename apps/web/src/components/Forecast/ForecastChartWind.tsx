import { RouterOutputs } from '@/utils/trpc'
import Symbol from '@/components/Symbol/Symbol'
import ArrowDown from '@/components/Icon/ArrowDown'
import ForecastChartBase from '@/components/Forecast/ForecastChartBase'
import { degreesToCardinal, degreesToRelativeCardinal, mpsToKmh } from '@peel/utils'

interface ForecastChartWindProps {
  offshoreWindDirection: RouterOutputs['wave']['findById']['offshoreWindDirection']
  weatherEvents: RouterOutputs['wave']['findById']['point']['forecast']['weatherEvents']
  className?: string
}

const WIND_SPEED_UPPER_LIMIT = 8

export default function ForecastChartWind({ weatherEvents, offshoreWindDirection }: ForecastChartWindProps) {
  return (
    <ForecastChartBase
      title={
        <div className="flex text-xs text-gray-500">
          <span>Wind</span>
          <span>&nbsp;</span>
          <Symbol symbol="air" />
        </div>
      }
      ticks={
        weatherEvents.map(({ windSpeed, windDirection }) => {
          const windSpeedConverted = mpsToKmh(windSpeed)
          const windCardinalDirection = degreesToCardinal(windDirection)
          const windRelativeCardinalDirection = degreesToRelativeCardinal(offshoreWindDirection, windDirection)
          const tickColor = windRelativeCardinalDirection ? ({ Offshore: '#a1d96c', Onshore: '#e37878', Crosswind: '#fbe774' })[windRelativeCardinalDirection] : '#e5e5e5' // prettier-ignore
          const tickHeight = `${(windSpeed && Math.min((windSpeed / WIND_SPEED_UPPER_LIMIT) * 100, 100)) || 0}%`
          const tickLabel = (
            <div className="flex flex-col whitespace-nowrap font-medium">
              <div style={{ color: tickColor }}>
                <ArrowDown className="w-full" rotate={windDirection} />
              </div>
              <div>
                <span className="text-xs">{windSpeedConverted}</span>
                <span className="text-2xs">kmh, {windCardinalDirection}</span>
              </div>
              <div className="text-2xs text-gray-500">{windRelativeCardinalDirection}</div>
            </div>
          )
          return {
            color: tickColor,
            height: tickHeight,
            label: tickLabel,
          }
        }) || []
      }
    />
  )
}
