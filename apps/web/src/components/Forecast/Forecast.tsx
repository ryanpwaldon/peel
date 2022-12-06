import { add } from 'date-fns'
import { Suspense, useState } from 'react'
import { getTzStartOfDay } from '@peel/utils'
import { formatInTimeZone } from 'date-fns-tz'
import { RouterOutputs, trpc } from '@/utils/trpc'
import Spinner from '@/components/Spinner/Spinner'
import InputTabs from '@/components/Input/InputTabs'
import ForecastChart from '@/components/Forecast/ForecastChart'
import { createWindTicks } from '@/components/Forecast/utils/createWindTicks'
import { createTideTicks } from '@/components/Forecast/utils/createTideTicks'
import { createSwellTicks } from '@/components/Forecast/utils/createSwellTicks'

interface ForecastProps {
  wave: RouterOutputs['wave']['findById']
}

export default function Forecast({ wave }: ForecastProps) {
  const [day, setDay] = useState(0)
  const localStartOfDay = getTzStartOfDay(wave.point.timezone, new Date())
  const tabs = [...new Array(7)].map((_, index) => ({
    label: index === 0 ? 'Live' : formatInTimeZone(add(localStartOfDay, { days: index }), wave.point.timezone, 'EEE'),
    value: index,
  }))

  return (
    <div className="mt-5">
      <div className="px-5">
        <span className="text-xl font-bold">Forecast</span>
        <InputTabs tabs={tabs} selected={day} setSelected={setDay} className="mt-3" />
      </div>
      <div className="mt-3">
        <Suspense
          fallback={
            <div className="flex h-[372px] w-full items-center justify-center border-y-hairline border-gray-200 bg-white">
              <Spinner />
            </div>
          }
        >
          <Charts wave={wave} day={day} />
        </Suspense>
      </div>
    </div>
  )
}

interface ChartsProps {
  wave: ForecastProps['wave']
  day: number
}

const Charts = ({ wave, day }: ChartsProps) => {
  const [user] = trpc.user.findMe.useSuspenseQuery()
  const [hoveredTick, setHoveredTick] = useState<number | null>(null)
  const [forecast] = trpc.forecast.findById.useSuspenseQuery({ id: wave.point.forecastId, timezone: wave.point.timezone, day })
  const sunrise = forecast.solarEvents.find((event) => event.type === 'SUNRISE')?.time || null
  const sunset = forecast.solarEvents.find((event) => event.type === 'SUNSET')?.time || null

  const windTicks = createWindTicks({
    weatherEvents: forecast.weatherEvents,
    waveFaceDirection: wave.faceDirection,
    windSpeedUnit: user.preferences.windSpeedUnit,
  })
  const swellTicks = createSwellTicks({
    weatherEvents: forecast.weatherEvents,
    swellHeightUnit: user.preferences.swellHeightUnit,
  })
  const tideTicks = createTideTicks({
    weatherEvents: forecast.weatherEvents,
  })

  return (
    <div className="divide-y-hairline divide-gray-200 border-y-hairline border-gray-200">
      <ForecastChart
        title="Wind"
        symbol="air"
        sunrise={sunrise}
        sunset={sunset}
        timezone={wave.point.timezone}
        ticks={windTicks}
        hoveredTick={hoveredTick}
        setHoveredTick={setHoveredTick}
      />
      <ForecastChart
        title="Swell"
        symbol="waves"
        sunrise={sunrise}
        sunset={sunset}
        timezone={wave.point.timezone}
        ticks={swellTicks}
        hoveredTick={hoveredTick}
        setHoveredTick={setHoveredTick}
      />
      <ForecastChart
        title="Tide"
        symbol="height"
        sunrise={sunrise}
        sunset={sunset}
        timezone={wave.point.timezone}
        ticks={tideTicks}
        hoveredTick={hoveredTick}
        setHoveredTick={setHoveredTick}
      />
    </div>
  )
}
