import Page from '@/components/Scaffolding/Page'
import PageTitle from '@/components/Title/PageTitle'
import Header from '@/components/Scaffolding/Header'

export default function SessionsPage() {
  return (
    <Page header={<Header />}>
      <div className="pb-content-bottom">
        <PageTitle title="Sessions" className="px-5" />
      </div>
    </Page>
  )
}
