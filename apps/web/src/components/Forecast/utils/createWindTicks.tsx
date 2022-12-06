import { RouterOutputs } from '@/utils/trpc'
import ArrowDown from '@/components/Icon/ArrowDown'
import type { WindSpeedUnit, Wave } from '@prisma/client'
import { degreesToCardinal, degreesToRelativeCardinalColor, degreesToRelativeCardinalText, convertWindSpeed } from '@peel/utils'

const WIND_SPEED_UPPER_LIMIT = 4

interface CreateWindTicksProps {
  windSpeedUnit: WindSpeedUnit
  waveFaceDirection: Wave['faceDirection']
  weatherEvents: RouterOutputs['forecast']['findById']['weatherEvents']
}

export const createWindTicks = ({ weatherEvents, waveFaceDirection, windSpeedUnit }: CreateWindTicksProps) => {
  return (
    weatherEvents.map(({ time, windSpeed, windDirection }) => {
      const windSpeedConverted = convertWindSpeed(windSpeed, windSpeedUnit)
      const windCardinalDirection = degreesToCardinal(windDirection)
      const windRelativeCardinalDirectionText = degreesToRelativeCardinalText(waveFaceDirection, windDirection)
      const tickColor = degreesToRelativeCardinalColor(waveFaceDirection, windDirection)
      const tickHeight = `${(windSpeed && Math.min((windSpeed / WIND_SPEED_UPPER_LIMIT) * 100, 100)) || 0}%`
      const tickLabel = (
        <>
          <div className="w-3" style={{ color: tickColor }}><ArrowDown className="w-full" rotate={windDirection} /></div>
          <span>
            <span>{windSpeedConverted.value}</span>
            <span className="text-2xs">{windSpeedConverted.unit}</span>
          </span>
          <span className="text-2xs text-gray-400">{windRelativeCardinalDirectionText}, {windCardinalDirection}</span>
        </>
      ) // prettier-ignore
      return {
        time,
        color: tickColor,
        label: tickLabel,
        height: tickHeight,
      }
    }) || []
  )
}
