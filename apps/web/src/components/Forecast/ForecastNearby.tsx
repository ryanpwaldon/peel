import { trpc } from '@/utils/trpc'
import { Suspense, useState } from 'react'
import { add, format, startOfDay } from 'date-fns'
import Spinner from '@/components/Spinner/Spinner'
import InputTabs from '@/components/Input/InputTabs'
import ForecastChart from '@/components/Forecast/ForecastChart'
import { createWindTicks } from '@/components/Forecast/utils/createWindTicks'
import { convertSwellHeight, degreesToRelativeCardinalText } from '@peel/utils'

export default function ForecastNearby() {
  const [day, setDay] = useState(0)
  const userStartOfDay = startOfDay(new Date())
  const tabs = [...new Array(7)].map((_, index) => ({
    label: index === 0 ? 'Live' : format(add(userStartOfDay, { days: index }), 'EEE'),
    value: index,
  }))

  return (
    <div className="mt-5">
      <div className="px-5">
        <span className="text-xl font-bold">Nearby</span>
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
          <Charts day={day} />
        </Suspense>
      </div>
    </div>
  )
}

interface ChartsProps {
  day: number
}

const Charts = ({ day }: ChartsProps) => {
  const [user] = trpc.user.findMe.useSuspenseQuery()
  const [waves] = trpc.wave.findByNames.useSuspenseQuery([`Soldiers Beach`, `Lakes Beach`, 'Pellows', 'Little Bommie', 'Rocky Point'])
  const [hoveredTick, setHoveredTick] = useState<number | null>(null)

  return (
    <div className="divide-y-hairline divide-gray-200 border-y-hairline border-gray-200">
      {waves.map((wave) => {
        const [forecast] = trpc.forecast.findById.useSuspenseQuery({ id: wave.point.forecastId, timezone: wave.point.timezone, day })
        const sunrise = forecast.solarEvents.find((event) => event.type === 'SUNRISE')?.time || null
        const sunset = forecast.solarEvents.find((event) => event.type === 'SUNSET')?.time || null

        const ticks = createWindTicks({
          weatherEvents: forecast.weatherEvents,
          waveFaceDirection: wave.faceDirection,
          windSpeedUnit: user.preferences.windSpeedUnit,
        })

        const renderCustomTitle = (activeTick: number | null) => {
          if (activeTick === null) {
            const { min: minSwellHeight, max: maxSwellHeight } = forecast.weatherEvents.reduce((acc, { waveHeight }) => ({ min: Math.min(acc.min, waveHeight ?? Infinity), max: Math.max(acc.max, waveHeight ?? -Infinity) }), { min: Infinity, max: -Infinity }) // prettier-ignore
            const convertedMinSwellHeight = convertSwellHeight(minSwellHeight, user.preferences.swellHeightUnit)
            const convertedMaxSwellHeight = convertSwellHeight(maxSwellHeight, user.preferences.swellHeightUnit)
            const relativeCardinalWindDirections = forecast.weatherEvents.map(({ windDirection }) => degreesToRelativeCardinalText(wave.faceDirection, windDirection)) // prettier-ignore
            const allOffshore = relativeCardinalWindDirections.every((direction) => direction === 'Offshore')
            const allOnshore = relativeCardinalWindDirections.every((direction) => direction === 'Onshore')
            const allCrosswind = relativeCardinalWindDirections.every((direction) => direction === 'Crosswind')
            const relativeCardinalWindDirection = allOffshore ? 'Offshore' : allOnshore ? 'Onshore' : allCrosswind ? 'Crosswind' : 'Mixed wind'
            return (
              <div className="whitespace-nowrap text-gray-800">
                <div className="text-sm font-medium">{wave.name}</div>
                <div className="text-xs">{`${convertedMinSwellHeight.value}-${convertedMaxSwellHeight.value}${convertedMinSwellHeight.unit}, ${relativeCardinalWindDirection}`}</div>
              </div>
            )
          } else {
            const convertedSwellHeight = convertSwellHeight(forecast.weatherEvents[activeTick]?.waveHeight ?? null, user.preferences.swellHeightUnit)
            const relativeCardinalWindDirection = degreesToRelativeCardinalText(wave.faceDirection, forecast.weatherEvents[activeTick]?.windDirection ?? null)
            return (
              <div className="whitespace-nowrap text-gray-800">
                <div className="text-sm font-medium">{wave.name}</div>
                <div className="text-xs">{`${convertedSwellHeight.value}${convertedSwellHeight.unit}, ${relativeCardinalWindDirection}`}</div>
              </div>
            )
          }
        }

        return (
          <ForecastChart
            key={wave.id}
            renderCustomTitle={renderCustomTitle}
            sunrise={sunrise}
            sunset={sunset}
            timezone={wave.point.timezone}
            ticks={ticks}
            hoveredTick={hoveredTick}
            setHoveredTick={setHoveredTick}
          />
        )
      })}
    </div>
  )
}
