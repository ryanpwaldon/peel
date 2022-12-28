import Page from '@/components/Page/Page'
import InfoLink from '@/components/Block/InfoLink'
import PageTitle from '@/components/Title/PageTitle'
import HeaderTitle from '@/components/Title/HeaderTitle'
import InputSearch from '@/components/Input/InputSearch'
import ForecastNearby from '@/components/Forecast/ForecastNearby'
import PageTransitionConsumer from '@/components/Page/PageTransitionConsumer'

export default function Home() {
  return (
    <PageTransitionConsumer>
      <Page headerCenter={<HeaderTitle title="Home" />}>
        <div className="pb-content-bottom">
          <PageTitle title="Home" className="px-5" />
          <InputSearch prompt="Waves, places, people..." className="mt-3 px-5" />
          <ForecastNearby />
          <InfoLink
            className="mt-5 px-5"
            linkText="Add a wave"
            linkPath="/wave/create"
            linkTransition="slideUp"
            message="Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet."
          />
        </div>
      </Page>
    </PageTransitionConsumer>
  )
}
