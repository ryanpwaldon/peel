import { trpc } from '@/utils/trpc'
import List from '@/components/List/List'
import Symbol from '@/components/Symbol/Symbol'
import { Sheet } from '@/components/Sheet/Sheet'
import Page from '@/components/Scaffolding/Page'
import Header from '@/components/Scaffolding/Header'
import PageTitle from '@/components/Title/PageTitle'

const profileSheet = <Sheet trigger={<Symbol symbol="account_circle" className="text-[28px] font-medium leading-8 text-blue-600" />}>Olá</Sheet>

export default function Home() {
  const waves = trpc.wave.findMany.useQuery()
  return (
    <Page header={<Header right={profileSheet} />}>
      <div className="pb-content-bottom">
        <PageTitle title="Home" className="px-5" />
        {waves.data && (
          <List
            className="mt-5"
            items={waves.data?.map((wave) => ({
              title: wave.name,
              path: `/wave/${wave.id}`,
              subtext: `${wave.point.location.region}, ${wave.point.location.country}`,
            }))}
          />
        )}
      </div>
    </Page>
  )
}
