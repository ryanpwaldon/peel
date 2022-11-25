interface Tick {
  windSpeed: number | null
  windDirection: number | null
}

interface ForecastSegment {
  title?: React.ReactNode
  sunset?: Date
  sunrise?: Date
  ticks: Tick[]
  tickColor?: () => string | string
  tickLabel?: (tick: number) => string
  max: number
  className?: string
}

export default function ForecastSegment({ title, ticks, max, className }: ForecastSegment) {
  const tickHeight = (val: number | null) => {
    if (!val) return 0
    if (val > max) return 100
    return (val / max) * 100
  }

  return (
    <div className={`flex w-full flex-col ${className}`}>
      <div>{title}</div>
      <div className="mt-2 grid w-full grid-flow-col gap-1">
        {ticks.map((tick, index) => (
          <div className="flex h-8 w-full items-end" key={index}>
            <div className="w-full rounded bg-gray-200" style={{ height: `${tickHeight(tick.windSpeed)}%` }} />
          </div>
        ))}
      </div>
      <div></div>
    </div>
  )
}
