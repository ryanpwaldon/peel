import { RouterOutputs } from '@/utils/trpc'
import ArrowDown from '@/components/Icon/ArrowDown'
import { degreesToCardinal, metersToFeet, swellPeriodToCardinalColor, swellPeriodToCardinalText } from '@peel/utils'

const SWELL_HEIGHT_UPPER_LIMIT = 3

interface CreateSwellTicksProps {
  weatherEvents: RouterOutputs['wave']['findById']['point']['forecast']['weatherEvents']
}

export const createSwellTicks = ({ weatherEvents }: CreateSwellTicksProps) => {
  return (
    weatherEvents.map(({ time, swellHeight, swellDirection, swellPeriod }) => {
      const swellHeightConverted = metersToFeet(swellHeight)
      const swellPeriodRounded = Math.round(swellPeriod || 0)
      const swellPeriodCardinalText = swellPeriodToCardinalText(swellPeriodRounded)
      const swellPeriodCardinalColor = swellPeriodToCardinalColor(swellPeriodRounded)
      const swellCardinalDirection = degreesToCardinal(swellDirection)
      const tickHeight = `${(swellHeight && Math.min((swellHeight / SWELL_HEIGHT_UPPER_LIMIT) * 100, 100)) || 0}%`
      const tickLabel = (
        <>
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
        </>
      )
      return {
        time,
        label: tickLabel,
        height: tickHeight,
        color: swellPeriodCardinalColor,
      }
    }) || []
  )
}
