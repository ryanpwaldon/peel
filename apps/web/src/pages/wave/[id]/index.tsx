import { trpc } from '@/utils/trpc'
import { useRouter } from 'next/router'
import { Suspense, useRef } from 'react'
import Back from '@/components/Back/Back'
import Symbol from '@/components/Symbol/Symbol'
import Button from '@/components/Button/Button'
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
  const waveId = useRef(router.query.id as string)
  const [wave] = trpc.wave.findById.useSuspenseQuery(waveId.current)

  return (
    <Page header={<Header left={<Back />} right={<Symbol symbol="more_horiz" className="text-2xl font-extrabold text-blue-600" />} />}>
      <div className="pb-content-bottom">
        <PageTitle title={wave.name} className="px-5" />
        <div className="px-5 text-base text-gray-500">{`${wave.point.location.region}, ${wave.point.location.country}`}</div>
        <div className="mt-4 flex space-x-3 px-5">
          <Button theme="white" className="h-11 w-full flex-1">
            <Symbol symbol="play_arrow" className="text-2xl" />
            <span>Start session</span>
          </Button>
          <Button theme="white" className="h-11 w-11">
            <Symbol symbol="star" className="text-2xl" />
          </Button>
        </div>
        <Forecast wave={wave} />
      </div>
    </Page>
  )
}
