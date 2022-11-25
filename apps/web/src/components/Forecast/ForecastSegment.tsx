interface Tick {
  windSpeed: number | null
  windDirection: number | null
}

interface ForecastSegment {
  title: React.ReactNode
  ticks: Tick[]
  tickMax: number
  tickLabel: (tick: Tick) => React.ReactNode
  className?: string
}

export default function ForecastSegment({ title, ticks, tickMax, tickLabel, className }: ForecastSegment) {
  const getTickHeight = (val: number | null) => {
    if (!val) return 0
    if (val > tickMax) return 100
    return (val / tickMax) * 100
  }

  return (
    <div className={`flex w-full flex-col border-y-hairline border-gray-200 bg-white px-5 py-3 ${className}`}>
      <div>{title}</div>
      <div className="mt-2 grid w-full auto-cols-fr grid-flow-col gap-1">
        {ticks.map((tick, index) => (
          <div key={index}>
            <div className="flex h-8 items-end">
              <div className="w-full rounded bg-gray-200" style={{ height: `${getTickHeight(tick.windSpeed)}%` }} />
            </div>
            <div className={`mt-1 ${index % 6 !== 0 && 'hidden'}`}>{tickLabel(tick)}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
