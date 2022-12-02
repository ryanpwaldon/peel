import { RouterOutputs } from '@/utils/trpc'
import Symbol from '@/components/Symbol/Symbol'
import ArrowDown from '@/components/Icon/ArrowDown'
import ForecastChartBase from '@/components/Forecast/ForecastChartBase'
import { degreesToCardinal, metersToFeet, swellPeriodToCardinalColor, swellPeriodToCardinalText } from '@peel/utils'

interface ForecastChartSwellProps {
  className?: string
  timezone: string
  weatherEvents: RouterOutputs['wave']['findById']['point']['forecast']['weatherEvents']
  solarEvents: RouterOutputs['wave']['findById']['point']['forecast']['solarEvents']
}

const SWELL_HEIGHT_UPPER_LIMIT = 3

export default function ForecastChartSwell({ className, timezone, weatherEvents, solarEvents }: ForecastChartSwellProps) {
  return (
    <ForecastChartBase
      className={className}
      solarEvents={solarEvents}
      title={
        <div className="flex text-xs text-gray-500">
          <span>Swell</span>
          <span>&nbsp;</span>
          <Symbol symbol="waves" />
        </div>
      }
      timezone={timezone}
      ticks={
        weatherEvents.map(({ time, swellHeight, swellDirection, swellPeriod }) => {
          const swellHeightConverted = metersToFeet(swellHeight)
          const swellPeriodRounded = Math.round(swellPeriod || 0)
          const swellPeriodCardinalText = swellPeriodToCardinalText(swellPeriodRounded)
          const swellPeriodCardinalColor = swellPeriodToCardinalColor(swellPeriodRounded)
          const swellCardinalDirection = degreesToCardinal(swellDirection)
          const tickHeight = `${(swellHeight && Math.min((swellHeight / SWELL_HEIGHT_UPPER_LIMIT) * 100, 100)) || 0}%`
          const tickLabel = (alignment: 'right' | 'left') => (
            <div className={`flex flex-col whitespace-nowrap text-xs font-medium ${alignment === 'left' ? 'items-start' : 'items-end'}`}>
              <div className="w-3" style={{ color: swellPeriodCardinalColor }}>
                <ArrowDown className="w-full" rotate={swellDirection} />
              </div>
              <div>
                <span>
                  {swellHeightConverted}
                  <span className="text-2xs">ft, </span>
                </span>
                <span>
                  {swellPeriodRounded}
                  <span className="text-2xs">s, </span>
                </span>
                <span className="text-2xs">{swellCardinalDirection}</span>
              </div>
              <div className="text-2xs text-gray-500">{swellPeriodCardinalText}</div>
            </div>
          )
          return {
            time,
            label: tickLabel,
            height: tickHeight,
            color: swellPeriodCardinalColor,
          }
        }) || []
      }
    />
  )
}
