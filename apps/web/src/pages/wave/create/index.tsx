import Back from '@/components/Back/Back'
import Symbol from '@/components/Symbol/Symbol'
import TitleMd from '@/components/Title/TitleMd'
import Page from '@/components/Scaffolding/Page'
import Header from '@/components/Scaffolding/Header'
import PageTitle from '@/components/Title/PageTitle'
import PageTransitionConsumer from '@/components/PageTransition/PageTransitionConsumer'

export default function WaveCreatePage() {
  return (
    <PageTransitionConsumer>
      <Page
        header={
          <Header
            left={
              <Back pageTransition="slideDown">
                <Symbol symbol="expand_more" className="text-3xl font-semibold" />
              </Back>
            }
          />
        }
        showNavigation={false}
      >
        <div className="px-5">
          <PageTitle title="Create a wave" />
          <TitleMd title="Enter details" className="mt-5" />
        </div>
      </Page>
    </PageTransitionConsumer>
  )
}
