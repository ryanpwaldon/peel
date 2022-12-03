import { Suspense } from 'react'
import { trpc } from '@/utils/trpc'
import { useRouter } from 'next/router'
import Symbol from '@/components/Symbol/Symbol'
import Page from '@/components/Scaffolding/Page'
import Spinner from '@/components/Spinner/Spinner'
import Header from '@/components/Scaffolding/Header'
import PageTitle from '@/components/Title/PageTitle'
import ForecastChart from '@/components/Forecast/ForecastChart'
import { createWindTicks } from '@/components/Forecast/utils/createWindTicks'

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
        <PageTitle title={wave.name} className="px-5" />
        <div className="mt-5 divide-y-hairline divide-gray-200 border-y-hairline border-gray-200">
          <ForecastChart
            title="Wind"
            symbol="air"
            timezone={wave.point.timezone}
            ticks={createWindTicks({
              weatherEvents: wave.point.forecast.weatherEvents,
              offshoreWindDirection: wave.offshoreWindDirection,
            })}
          />
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
