import Symbol from '@/components/Symbol/Symbol'
import { Sheet } from '@/components/Sheet/Sheet'
import Page from '@/components/Scaffolding/Page'
import Header from '@/components/Scaffolding/Header'
import PageTitle from '@/components/Title/PageTitle'
import InputSearch from '@/components/Input/InputSearch'
import ForecastNearby from '@/components/Forecast/ForecastNearby'
import PageTransitionConsumer from '@/components/PageTransition/PageTransitionConsumer'

const ProfileSheet = () => <Sheet trigger={<Symbol symbol="account_circle" className="text-[28px] font-medium leading-8 text-blue-600" />}>Olá</Sheet>

export default function Home() {
  return (
    <PageTransitionConsumer>
      <Page header={<Header right={<ProfileSheet />} />}>
        <div className="pb-content-bottom">
          <PageTitle title="Home" className="px-5" />
          <InputSearch prompt="Waves, places, people..." className="mt-3 px-5" />
          <ForecastNearby />
        </div>
      </Page>
    </PageTransitionConsumer>
  )
}
