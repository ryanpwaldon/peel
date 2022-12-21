import Page from '@/components/Page/Page'
import PageTitle from '@/components/Title/PageTitle'
import HeaderTitle from '@/components/Title/HeaderTitle'
import PageTransitionConsumer from '@/components/Page/PageTransitionConsumer'

export default function SessionsPage() {
  return (
    <PageTransitionConsumer>
      <Page headerCenter={<HeaderTitle title="Home" />}>
        <div className="pb-content-bottom">
          <PageTitle title="Sessions" className="px-5" />
        </div>
      </Page>
    </PageTransitionConsumer>
  )
}
