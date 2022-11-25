interface Tick {
  windSpeed: number | null
  windDirection: number | null
}

interface ForecastSegment {
  title: React.ReactNode
  tickLabel: (tick: Tick) => React.ReactNode
  className?: string
  tickMax: number
  ticks: Tick[]
}

export default function ForecastSegment({ title, ticks, tickMax, tickLabel, className }: ForecastSegment) {
  const tickHeight = (val: number | null) => {
    if (!val) return 0
    if (val > tickMax) return 100
    return (val / tickMax) * 100
  }

  return (
    <div className={`flex w-full flex-col ${className}`}>
      <div>{title}</div>
      <div className="mt-2 grid w-full auto-cols-fr grid-flow-col gap-1">
        {ticks.map((tick, index) => (
          <div key={index} className="min-w-0">
            <div className="flex h-8 items-end">
              <div className="w-full rounded bg-gray-200" style={{ height: `${tickHeight(tick.windSpeed)}%` }} />
            </div>
            <div className={`mt-1 ${index % 6 !== 0 && 'hidden'}`}>{tickLabel(tick)}</div>
          </div>
        ))}
      </div>
      <div></div>
    </div>
  )
}
