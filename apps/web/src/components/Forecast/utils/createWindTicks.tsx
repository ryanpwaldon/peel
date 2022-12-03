import { RouterOutputs } from '@/utils/trpc'
import ArrowDown from '@/components/Icon/ArrowDown'
import { degreesToCardinal, degreesToRelativeCardinalColor, degreesToRelativeCardinalText, mpsToKmh } from '@peel/utils'

const WIND_SPEED_UPPER_LIMIT = 4

interface CreateWindTicksProps {
  offshoreWindDirection: RouterOutputs['wave']['findById']['offshoreWindDirection']
  weatherEvents: RouterOutputs['wave']['findById']['point']['forecast']['weatherEvents']
}

export const createWindTicks = ({ weatherEvents, offshoreWindDirection }: CreateWindTicksProps) => {
  return (
    weatherEvents.map(({ time, windSpeed, windDirection }) => {
      const windSpeedConverted = mpsToKmh(windSpeed)
      const windCardinalDirection = degreesToCardinal(windDirection)
      const windRelativeCardinalDirectionText = degreesToRelativeCardinalText(offshoreWindDirection, windDirection)
      const tickColor = degreesToRelativeCardinalColor(offshoreWindDirection, windDirection)
      const tickHeight = `${(windSpeed && Math.min((windSpeed / WIND_SPEED_UPPER_LIMIT) * 100, 100)) || 0}%`
      const tickLabel = (
        <>
          <div className="w-3" style={{ color: tickColor }}>
            <ArrowDown className="w-full" rotate={windDirection} />
          </div>
          <div>
            <span className="text-xs">{windSpeedConverted}</span>
            <span className="text-2xs">kmh, {windCardinalDirection}</span>
          </div>
          <div className="text-2xs text-gray-500">{windRelativeCardinalDirectionText}</div>
        </>
      )
      return {
        time,
        label: tickLabel,
        height: tickHeight,
        color: tickColor,
      }
    }) || []
  )
}