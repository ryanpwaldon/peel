import Map from '@/components/Map/Map'
import Page from '@/components/Page/Page'
import PageTransitionConsumer from '@/components/Page/PageTransitionConsumer'

export default function MapPage() {
  return (
    <PageTransitionConsumer>
      <Page>
        <Map />
      </Page>
    </PageTransitionConsumer>
  )
}
