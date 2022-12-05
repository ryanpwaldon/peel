import { Suspense } from 'react'
import { trpc } from '@/utils/trpc'
import { useRouter } from 'next/router'
import Back from '@/components/Back/Back'
import Symbol from '@/components/Symbol/Symbol'
import Page from '@/components/Scaffolding/Page'
import Spinner from '@/components/Spinner/Spinner'
import Header from '@/components/Scaffolding/Header'
import PageTitle from '@/components/Title/PageTitle'
import Forecast from '@/components/Forecast/Forecast'

export default function Wave() {
  return (
    <Suspense
      fallback={
        <Page header={<Header left={<Back />} />}>
          <div className="flex h-full w-full items-center justify-center">
            <Spinner />
          </div>
        </Page>
      }
    >
      <Content />
    </Suspense>
  )
}

const Content = () => {
  const router = useRouter()
  const [wave] = trpc.wave.findById.useSuspenseQuery(router.query.id as string)

  return (
    <Page header={<Header left={<Back />} right={<Symbol symbol="more_horiz" className="text-2xl font-extrabold text-blue-600" />} />}>
      <div className="pb-content-bottom pt-1">
        <PageTitle title={wave.name} className="px-5" />
        <div className="px-5 text-base text-gray-500">{`${wave.point.location.region}, ${wave.point.location.country}`}</div>
        <Forecast wave={wave} />
      </div>
    </Page>
  )
}
