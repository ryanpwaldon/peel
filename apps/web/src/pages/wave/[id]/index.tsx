import { Suspense } from 'react'
import { trpc } from '@/utils/trpc'
import { useRouter } from 'next/router'
import Symbol from '@/components/Symbol/Symbol'
import Page from '@/components/Scaffolding/Page'
import Spinner from '@/components/Spinner/Spinner'
import Header from '@/components/Scaffolding/Header'
import PageTitle from '@/components/Title/PageTitle'
import ForecastChartTide from '@/components/Forecast/ForecastChartTide'
import ForecastChartWind from '@/components/Forecast/ForecastChartWind'
import ForecastChartSwell from '@/components/Forecast/ForecastChartSwell'

export default function Wave() {
  return (
    <Suspense fallback={<Loading />}>
      <Content />
    </Suspense>
  )
}

const Content = () => {
  const router = useRouter()
  const [wave] = trpc.wave.findById.useSuspenseQuery(router.query.id as string)
  return (
    <Page header={<Header right={<Symbol symbol="more_horiz" className="text-[28px] font-medium leading-8 text-blue-600" />} />}>
      <div className="pb-content-bottom">
        <PageTitle title="Wave" className="px-5" />
        <div className="mt-5 divide-y-hairline divide-gray-200 border-y-hairline border-gray-200">
          <ForecastChartWind
            timezone={wave.point.timezone}
            offshoreWindDirection={wave.offshoreWindDirection}
            weatherEvents={wave.point.forecast.weatherEvents}
          />
          <ForecastChartSwell timezone={wave.point.timezone} weatherEvents={wave.point.forecast.weatherEvents} />
          <ForecastChartTide timezone={wave.point.timezone} weatherEvents={wave.point.forecast.weatherEvents} />
        </div>
      </div>
    </Page>
  )
}

const Loading = () => {
  return (
    <Page>
      <div className="flex h-full w-full items-center justify-center">
        <Spinner />
      </div>
    </Page>
  )
}
