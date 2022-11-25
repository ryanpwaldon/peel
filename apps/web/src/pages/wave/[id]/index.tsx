import { trpc } from '@/utils/trpc'
import { mpsToKmh } from '@peel/utils'
import { useRouter } from 'next/router'
import Symbol from '@/components/Symbol/Symbol'
import Page from '@/components/Scaffolding/Page'
import ArrowDown from '@/components/Icon/ArrowDown'
import Header from '@/components/Scaffolding/Header'
import PageTitle from '@/components/Title/PageTitle'
import ForecastSegment from '@/components/Forecast/ForecastSegment'

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
  const ticks = wave.data?.point.forecast.weatherEvents.map((weatherEvent) => ({ windSpeed: weatherEvent.windSpeed, windDirection: weatherEvent.windDirection })) || [] // prettier-ignore

  const tickLabel = (tick: typeof ticks[number]) => (
    <div className="flex flex-col whitespace-nowrap font-medium">
      <ArrowDown className="w-full" rotate={tick.windDirection} />
      <div>
        <span className="text-xs">{mpsToKmh(tick.windSpeed)}</span>
        <span className="text-2xs">kmh, NNW</span>
      </div>
      <div className="text-2xs text-gray-500">Crosswind</div>
    </div>
  )

  return (
    <Page header={<Header right={<Symbol symbol="more_horiz" className="text-[28px] font-medium leading-8 text-blue-600" />} />}>
      <div className="px-5 pb-content-bottom">
        <PageTitle title="Wave" />
        {wave.data && <ForecastSegment title={WindForecastTitle} ticks={ticks} tickMax={10} className="mt-5" tickLabel={tickLabel} />}
      </div>
    </Page>
  )
}
