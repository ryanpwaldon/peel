import Page from '@/components/Page/Page'
import Header from '@/components/Header/Header'
import PageTitle from '@/components/Title/PageTitle'
import PageTransitionConsumer from '@/components/Page/PageTransitionConsumer'

export default function CreateSessionPage() {
  return (
    <PageTransitionConsumer>
      <Page header={<Header />}>
        <div className="pb-content-bottom">
          <PageTitle title="Create session" className="px-5" />
        </div>
      </Page>
    </PageTransitionConsumer>
  )
}
