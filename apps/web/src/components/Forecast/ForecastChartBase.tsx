interface Tick {
  color: string
  height: string
  label: React.ReactNode
}

interface ForecastSegment {
  title: React.ReactNode
  ticks: Tick[]
  className?: string
}

export default function ForecastChartBase({ title, ticks, className }: ForecastSegment) {
  return (
    <div className={`flex w-full flex-col border-y-hairline border-gray-200 bg-white px-5 py-3 ${className}`}>
      <div>{title}</div>
      <div className="mt-2 grid w-full auto-cols-fr grid-flow-col gap-1">
        {ticks.map((tick, index) => (
          <div key={index}>
            <div className="flex h-8 items-end">
              <div className="w-full rounded" style={{ height: tick.height, backgroundColor: tick.color }} />
            </div>
            <div className={`mt-1 ${index % 6 !== 0 && 'hidden'}`}>{tick.label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
