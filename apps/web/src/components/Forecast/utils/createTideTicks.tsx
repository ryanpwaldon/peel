import { RouterOutputs } from '@/utils/trpc'

interface CreateTideTicksProps {
  weatherEvents: RouterOutputs['wave']['findById']['point']['forecast']['weatherEvents']
}

export const createTideTicks = ({ weatherEvents }: CreateTideTicksProps) => {
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
      const seaLevelRounded = Math.round((seaLevel || 0) * 100) / 100
      const tickHeight = `${(seaLevelRounded && Math.min((seaLevelRounded / tideUpperLimit) * 100, 100)) || 0}%`
      const tickLabel = (
        <>
          <span>{seaLevelRounded}<span className="text-2xs">m</span></span>
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
