import { Suspense } from 'react'
import { trpc } from '@/utils/trpc'
import List from '@/components/List/List'
import Symbol from '@/components/Symbol/Symbol'
import { Sheet } from '@/components/Sheet/Sheet'
import Page from '@/components/Scaffolding/Page'
import Spinner from '@/components/Spinner/Spinner'
import Header from '@/components/Scaffolding/Header'
import PageTitle from '@/components/Title/PageTitle'
import InputSearch from '@/components/Input/InputSearch'

export default function Home() {
  return (
    <Suspense fallback={<Loading />}>
      <Content />
    </Suspense>
  )
}

const ProfileSheet = () => <Sheet trigger={<Symbol symbol="account_circle" className="text-[28px] font-medium leading-8 text-blue-600" />}>Olá</Sheet>

const Content = () => {
  const [waves] = trpc.wave.findMany.useSuspenseQuery()
  return (
    <Page header={<Header right={<ProfileSheet />} />}>
      <div className="pb-content-bottom">
        <PageTitle title="Home" className="px-5" />
        <InputSearch prompt="Waves, places, people..." className="mt-3 px-5" />
        <List
          className="mt-5"
          items={waves.map((wave) => ({
            title: wave.name,
            path: `/wave/${wave.id}`,
            subtext: `${wave.point.location.region}, ${wave.point.location.country}`,
          }))}
        />
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
