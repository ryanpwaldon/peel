import Symbol from '@/components/Symbol/Symbol'
import { Sheet } from '@/components/Sheet/Sheet'
import Page from '@/components/Scaffolding/Page'
import Header from '@/components/Scaffolding/Header'
import PageTitle from '@/components/Title/PageTitle'

const profileSheet = <Sheet trigger={<Symbol symbol="account_circle" className="text-[28px] font-medium leading-8 text-blue-600" />}>Olá</Sheet>

export default function Home() {
  return (
    <Page header={<Header right={profileSheet} />}>
      <div className="pb-content-bottom px-5">
        <PageTitle title="Home" />
      </div>
    </Page>
  )
}
