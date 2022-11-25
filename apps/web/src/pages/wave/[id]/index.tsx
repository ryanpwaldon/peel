import { trpc } from '@/utils/trpc'
import { useRouter } from 'next/router'
import Symbol from '@/components/Symbol/Symbol'
import Page from '@/components/Scaffolding/Page'
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
  return (
    <Page header={<Header right={<Symbol symbol="more_horiz" className="text-[28px] font-medium leading-8 text-blue-600" />} />}>
      <div className="px-5 pb-content-bottom">
        <PageTitle title="Wave" />
        {wave.data && <ForecastSegment title={WindForecastTitle} ticks={ticks} max={10} className="mt-5" />}
      </div>
    </Page>
  )
}
