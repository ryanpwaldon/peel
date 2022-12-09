import Page from '@/components/Scaffolding/Page'
import PageTitle from '@/components/Title/PageTitle'
import Header from '@/components/Scaffolding/Header'

export default function CreateSessionPage() {
  return (
    <Page header={<Header />}>
      <div className="pb-content-bottom">
        <PageTitle title="Create session" className="px-5" />
      </div>
    </Page>
  )
}
