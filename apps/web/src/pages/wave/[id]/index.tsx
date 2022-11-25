import { trpc } from '@/utils/trpc'
import { useRouter } from 'next/router'
import Symbol from '@/components/Symbol/Symbol'
import Page from '@/components/Scaffolding/Page'
import ArrowDown from '@/components/Icon/ArrowDown'
import Header from '@/components/Scaffolding/Header'
import PageTitle from '@/components/Title/PageTitle'
import ForecastSegment from '@/components/Forecast/ForecastSegment'
import { degreesToCardinal, degreesToRelativeCardinal, mpsToKmh } from '@peel/utils'

export default function Wave() {
  const router = useRouter()
  const wave = trpc.wave.findById.useQuery(router.query.id as string, { enabled: !!router.query.id })

  const WIND_SPEED_UPPER_LIMIT = 8
  const title = (
    <div className="flex text-xs text-gray-500">
      <span>Wind</span>
      <span>&nbsp;</span>
      <Symbol symbol="air" />
    </div>
  )
  const ticks =
    wave.data?.point.forecast.weatherEvents.map(({ windSpeed, windDirection }) => {
      const offshoreWindDirection = wave.data.offshoreWindDirection
      const windSpeedConverted = mpsToKmh(windSpeed)
      const windCardinalDirection = degreesToCardinal(windDirection)
      const windRelativeCardinalDirection = degreesToRelativeCardinal(offshoreWindDirection, windDirection)
      const tickColor = windRelativeCardinalDirection ? ({ Offshore: '#a1d96c', Onshore: '#e37878', Crosswind: '#fbe774' })[windRelativeCardinalDirection] : '#e5e5e5' // prettier-ignore
      const tickHeight = `${(windSpeed && Math.min((windSpeed / WIND_SPEED_UPPER_LIMIT) * 100, 100)) || 0}%`
      const tickLabel = (
        <div className="flex flex-col whitespace-nowrap font-medium">
          <div style={{ color: tickColor }}>
            <ArrowDown className="w-full" rotate={windDirection} />
          </div>
          <div>
            <span className="text-xs">{windSpeedConverted}</span>
            <span className="text-2xs">kmh, {windCardinalDirection}</span>
          </div>
          <div className="text-2xs text-gray-500">{windRelativeCardinalDirection}</div>
        </div>
      )
      return {
        color: tickColor,
        height: tickHeight,
        label: tickLabel,
      }
    }) || []

  return (
    <Page header={<Header right={<Symbol symbol="more_horiz" className="text-[28px] font-medium leading-8 text-blue-600" />} />}>
      <div className="pb-content-bottom">
        <PageTitle title="Wave" className="px-5" />
        {wave.data && <ForecastSegment title={title} ticks={ticks} className="mt-5" />}
      </div>
    </Page>
  )
}
