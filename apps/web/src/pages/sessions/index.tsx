import Page from '@/components/Page/Page'
import Header from '@/components/Header/Header'
import PageTitle from '@/components/Title/PageTitle'
import PageTransitionConsumer from '@/components/Page/PageTransitionConsumer'

export default function SessionsPage() {
  return (
    <PageTransitionConsumer>
      <Page header={<Header />}>
        <div className="pb-content-bottom">
          <PageTitle title="Sessions" className="px-5" />
        </div>
      </Page>
    </PageTransitionConsumer>
  )
}
