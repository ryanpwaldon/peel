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
}

export default function ForecastSegment({ title, ticks, max }: ForecastSegment) {
  const tickHeight = (val: number | null) => {
    if (!val) return 0
    if (val > max) return 100
    return (val / max) * 100
  }

  return (
    <div className="flex w-full flex-col">
      <div>{title}</div>
      <div className="grid w-full grid-flow-col gap-1">
        {ticks.map((tick, index) => (
          <div className="h-8 w-full rounded bg-gray-200" style={{ height: `${tickHeight(tick.windSpeed)}%` }} key={index} />
        ))}
      </div>
      <div></div>
    </div>
  )
}
