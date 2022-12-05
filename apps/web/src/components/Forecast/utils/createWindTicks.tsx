import { RouterOutputs } from '@/utils/trpc'
import ArrowDown from '@/components/Icon/ArrowDown'
import { degreesToCardinal, degreesToRelativeCardinalColor, degreesToRelativeCardinalText, mpsToKmh } from '@peel/utils'

const WIND_SPEED_UPPER_LIMIT = 4

interface CreateWindTicksProps {
  waveFaceDirection: RouterOutputs['wave']['findById']['faceDirection']
  weatherEvents: RouterOutputs['forecast']['findById']['weatherEvents']
}

export const createWindTicks = ({ weatherEvents, waveFaceDirection }: CreateWindTicksProps) => {
  return (
    weatherEvents.map(({ time, windSpeed, windDirection }) => {
      const windSpeedConverted = mpsToKmh(windSpeed)
      const windCardinalDirection = degreesToCardinal(windDirection)
      const windRelativeCardinalDirectionText = degreesToRelativeCardinalText(waveFaceDirection, windDirection)
      const tickColor = degreesToRelativeCardinalColor(waveFaceDirection, windDirection)
      const tickHeight = `${(windSpeed && Math.min((windSpeed / WIND_SPEED_UPPER_LIMIT) * 100, 100)) || 0}%`
      const tickLabel = (
        <>
          <div className="w-3" style={{ color: tickColor }}><ArrowDown className="w-full" rotate={windDirection} /></div>
          <span>
            <span>{windSpeedConverted}</span>
            <span className="text-2xs">kmh</span>
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
