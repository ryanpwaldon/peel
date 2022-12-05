import { RouterOutputs } from '@/utils/trpc'
import ArrowDown from '@/components/Icon/ArrowDown'
import { degreesToCardinal, metersToFeet, swellPeriodToCardinalColor, swellPeriodToCardinalText } from '@peel/utils'

const SWELL_HEIGHT_UPPER_LIMIT = 3

interface CreateSwellTicksProps {
  weatherEvents: RouterOutputs['forecast']['findById']['weatherEvents']
}

export const createSwellTicks = ({ weatherEvents }: CreateSwellTicksProps) => {
  return (
    weatherEvents.map(({ time, waveHeight, waveDirection, wavePeriod }) => {
      const swellHeightConverted = metersToFeet(waveHeight)
      const swellPeriodRounded = Math.round(wavePeriod || 0)
      const swellPeriodCardinalText = swellPeriodToCardinalText(swellPeriodRounded)
      const swellCardinalDirection = degreesToCardinal(waveDirection)
      const tickColor = swellPeriodToCardinalColor(swellPeriodRounded)
      const tickHeight = `${(waveHeight && Math.min((waveHeight / SWELL_HEIGHT_UPPER_LIMIT) * 100, 100)) || 0}%`
      const tickLabel = (
        <>
          <div className="w-3" style={{ color: tickColor }}><ArrowDown className="w-full" rotate={waveDirection} /></div>
          <span>
            <span>{swellHeightConverted}<span className="text-2xs">ft, </span></span>
            <span>{swellPeriodRounded}<span className="text-2xs">s</span></span>
          </span>
          <span className="text-2xs text-gray-400">{swellPeriodCardinalText}, {swellCardinalDirection}</span>
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
