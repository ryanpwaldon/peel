import { trpc } from '@/utils/trpc'
import { useRouter } from 'next/router'
import Symbol from '@/components/Symbol/Symbol'
import Page from '@/components/Scaffolding/Page'
import Header from '@/components/Scaffolding/Header'
import PageTitle from '@/components/Title/PageTitle'
import ForecastChartWind from '@/components/Forecast/ForecastChartWind'

export default function Wave() {
  const router = useRouter()
  const wave = trpc.wave.findById.useQuery(router.query.id as string, { enabled: !!router.query.id })

  return (
    <Page header={<Header right={<Symbol symbol="more_horiz" className="text-[28px] font-medium leading-8 text-blue-600" />} />}>
      <div className="pb-content-bottom">
        <PageTitle title="Wave" className="px-5" />
        {wave.data && (
          <ForecastChartWind offshoreWindDirection={wave.data.offshoreWindDirection} weatherEvents={wave.data.point.forecast.weatherEvents} className="mt-5" />
        )}
      </div>
    </Page>
  )
}
