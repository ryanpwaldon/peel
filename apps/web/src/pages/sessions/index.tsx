import Page from '@/components/Page/Page'
import PageTitle from '@/components/Title/PageTitle'
import Header from '@/components/Scaffolding/Header'
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
