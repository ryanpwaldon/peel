import { trpc } from '@/utils/trpc'
import { useRouter } from 'next/router'
import Back from '@/components/Back/Back'
import { Suspense, useState } from 'react'
import Symbol from '@/components/Symbol/Symbol'
import Page from '@/components/Scaffolding/Page'
import Spinner from '@/components/Spinner/Spinner'
import Header from '@/components/Scaffolding/Header'
import PageTitle from '@/components/Title/PageTitle'
import ForecastChart from '@/components/Forecast/ForecastChart'
import { createWindTicks } from '@/components/Forecast/utils/createWindTicks'
import { createTideTicks } from '@/components/Forecast/utils/createTideTicks'
import { createSwellTicks } from '@/components/Forecast/utils/createSwellTicks'

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
  const sunrise = wave.point.forecast.solarEvents.find((event) => event.type === 'SUNRISE')?.time || null
  const sunset = wave.point.forecast.solarEvents.find((event) => event.type === 'SUNSET')?.time || null
  const [hoveredTick, setHoveredTick] = useState<number | null>(null)

  return (
    <Page header={<Header left={<Back />} right={<Symbol symbol="more_horiz" className="text-[28px] font-medium leading-8 text-blue-600" />} />}>
      <div className="pb-content-bottom pt-1">
        <PageTitle title={wave.name} className="px-5" />
        <div className="px-5 text-base text-gray-500">{`${wave.point.location.region}, ${wave.point.location.country}`}</div>
        <div className="mt-5 divide-y-hairline divide-gray-200 border-y-hairline border-gray-200">
          <ForecastChart
            title="Wind"
            symbol="air"
            sunrise={sunrise}
            sunset={sunset}
            timezone={wave.point.timezone}
            ticks={createWindTicks({ weatherEvents: wave.point.forecast.weatherEvents, offshoreWindDirection: wave.offshoreWindDirection })}
            hoveredTick={hoveredTick}
            setHoveredTick={setHoveredTick}
          />
          <ForecastChart
            title="Swell"
            symbol="waves"
            sunrise={sunrise}
            sunset={sunset}
            timezone={wave.point.timezone}
            ticks={createSwellTicks({ weatherEvents: wave.point.forecast.weatherEvents })}
            hoveredTick={hoveredTick}
            setHoveredTick={setHoveredTick}
          />
          <ForecastChart
            title="Tide"
            symbol="height"
            sunrise={sunrise}
            sunset={sunset}
            timezone={wave.point.timezone}
            ticks={createTideTicks({ weatherEvents: wave.point.forecast.weatherEvents })}
            hoveredTick={hoveredTick}
            setHoveredTick={setHoveredTick}
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
