import { RouterOutputs } from '@/utils/trpc'
import { TideHeightUnit } from '@prisma/client'
import { convertTideHeight } from '@peel/utils'

interface CreateTideTicksProps {
  tideHeightUnit: TideHeightUnit
  weatherEvents: RouterOutputs['forecast']['findById']['weatherEvents']
}

export const createTideTicks = ({ weatherEvents, tideHeightUnit }: CreateTideTicksProps) => {
  const tideUpperLimit = weatherEvents.reduce((acc, { seaLevel }) => Math.max(acc, seaLevel || 0), 0)
  return (
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
      const tideHeightConverted = convertTideHeight(seaLevel, tideHeightUnit)
      const tickHeight = `${(seaLevel && Math.min((seaLevel / tideUpperLimit) * 100, 100)) || 0}%`
      const tickLabel = (
        <>
          <span>{tideHeightConverted.value}<span className="text-2xs">{tideHeightConverted.unit}</span></span>
          <span className="text-2xs text-gray-400">{tideDirection}</span>
        </>
      ) // prettier-ignore
      return {
        time,
        color: '#e5e5e5',
        label: tickLabel,
        height: tickHeight,
      }
    }) || []
  )
}
