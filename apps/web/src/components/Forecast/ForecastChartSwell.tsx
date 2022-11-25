import { RouterOutputs } from '@/utils/trpc'
import Symbol from '@/components/Symbol/Symbol'
import ArrowDown from '@/components/Icon/ArrowDown'
import ForecastChartBase from '@/components/Forecast/ForecastChartBase'
import { degreesToCardinal, metersToFeet, swellHeightToCardinal, swellPeriodToCardinalColor, swellPeriodToCardinalText } from '@peel/utils'

interface ForecastChartSwellProps {
  className?: string
  weatherEvents: RouterOutputs['wave']['findById']['point']['forecast']['weatherEvents']
}

const SWELL_HEIGHT_UPPER_LIMIT = 5

export default function ForecastChartSwell({ className, weatherEvents }: ForecastChartSwellProps) {
  return (
    <ForecastChartBase
      className={className}
      title={
        <div className="flex text-xs text-gray-500">
          <span>Swell</span>
          <span>&nbsp;</span>
          <Symbol symbol="air" />
        </div>
      }
      ticks={
        weatherEvents.map(({ swellHeight, swellDirection, swellPeriod }) => {
          const swellHeightConverted = metersToFeet(swellHeight)
          const swellHeightCardinalText = swellHeightToCardinal(swellHeight)
          const swellPeriodCardinalText = swellPeriodToCardinalText(swellPeriod)
          const swellPeriodCardinalColor = swellPeriodToCardinalColor(swellPeriod)
          const swellCardinalDirection = degreesToCardinal(swellDirection)
          const tickHeight = `${(swellHeight && Math.min((swellHeight / SWELL_HEIGHT_UPPER_LIMIT) * 100, 100)) || 0}%`
          const tickLabel = (
            <div className="flex flex-col whitespace-nowrap font-medium">
              <div style={{ color: swellPeriodCardinalColor }}>
                <ArrowDown className="w-full" rotate={swellDirection} />
              </div>
              <div>
                <span className="text-xs">{swellHeightConverted}</span>
                <span className="text-2xs">
                  ft, {Math.round(swellPeriod || 0)}s, {swellCardinalDirection}
                </span>
              </div>
              <div className="text-2xs text-gray-500">
                {swellHeightCardinalText}, {swellPeriodCardinalText}
              </div>
            </div>
          )
          return {
            label: tickLabel,
            height: tickHeight,
            color: swellPeriodCardinalColor,
          }
        }) || []
      }
    />
  )
}
