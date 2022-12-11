import Map from '@/components/Map/Map'
import Page from '@/components/Scaffolding/Page'
import PageTransitionConsumer from '@/components/PageTransition/PageTransitionConsumer'

export default function MapPage() {
  return (
    <PageTransitionConsumer>
      <Page>
        <Map />
      </Page>
    </PageTransitionConsumer>
  )
}
