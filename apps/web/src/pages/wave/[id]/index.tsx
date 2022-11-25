import { trpc } from '@/utils/trpc'
import { useRouter } from 'next/router'
import Symbol from '@/components/Symbol/Symbol'
import Page from '@/components/Scaffolding/Page'
import ArrowDown from '@/components/Icon/ArrowDown'
import Header from '@/components/Scaffolding/Header'
import PageTitle from '@/components/Title/PageTitle'
import ForecastSegment from '@/components/Forecast/ForecastSegment'
import { degreesToCardinal, degreesToRelativeCardinal, mpsToKmh } from '@peel/utils'

const WindForecastTitle = (
  <div className="flex text-xs text-gray-500">
    <span>Wind</span>
    <span>&nbsp;</span>
    <Symbol symbol="air" />
  </div>
)

export default function Wave() {
  const router = useRouter()
  const wave = trpc.wave.findById.useQuery(router.query.id as string, { enabled: !!router.query.id })

  const ticks =
    wave.data?.point.forecast.weatherEvents.map((weatherEvent) => ({
      windSpeed: weatherEvent.windSpeed,
      windDirection: weatherEvent.windDirection,
      windSpeedConverted: mpsToKmh(weatherEvent.windSpeed),
      windCardinalDirection: degreesToCardinal(weatherEvent.windDirection),
      windRelativeCardinalDirection: degreesToRelativeCardinal(wave.data.offshoreWindDirection, weatherEvent.windDirection),
    })) || []

  const tickColor = (tick: typeof ticks[number]) => {
    if (tick.windRelativeCardinalDirection === 'Onshore') return 'bg-red-300'
    if (tick.windRelativeCardinalDirection === 'Offshore') return 'bg-green-300'
    else return 'bg-yellow-300'
  }

  const tickLabel = (tick: typeof ticks[number]) => (
    <div className="flex flex-col whitespace-nowrap font-medium">
      <ArrowDown className="w-full" rotate={tick.windDirection} />
      <div>
        <span className="text-xs">{tick.windSpeedConverted}</span>
        <span className="text-2xs">kmh, {tick.windCardinalDirection}</span>
      </div>
      <div className="text-2xs text-gray-500">{tick.windRelativeCardinalDirection}</div>
    </div>
  )

  return (
    <Page header={<Header right={<Symbol symbol="more_horiz" className="text-[28px] font-medium leading-8 text-blue-600" />} />}>
      <div className="pb-content-bottom">
        <PageTitle title="Wave" className="px-5" />
        {wave.data && <ForecastSegment title={WindForecastTitle} ticks={ticks} tickMax={8} className="mt-5" tickLabel={tickLabel} tickColor={tickColor} />}
      </div>
    </Page>
  )
}
