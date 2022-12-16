import Back from '@/components/Back/Back'
import Symbol from '@/components/Symbol/Symbol'
import TitleMd from '@/components/Title/TitleMd'
import Page from '@/components/Scaffolding/Page'
import Header from '@/components/Scaffolding/Header'
import PageTitle from '@/components/Title/PageTitle'
import InputPromptText from '@/components/InputPrompt/InputPromptText'
import PageTransitionConsumer from '@/components/PageTransition/PageTransitionConsumer'

export default function WaveCreatePage() {
  return (
    <PageTransitionConsumer>
      <Page header={<CreateWaveHeader />} showNavigation={false}>
        <div className="px-5">
          <PageTitle title="Create a wave" />
          <TitleMd title="Enter details" className="mt-5" />
          <InputPromptText title="Name" placeholder="Enter a name" href="/wave/create/name" className="mt-3" />
        </div>
      </Page>
    </PageTransitionConsumer>
  )
}

const CreateWaveHeader = () => (
  <Header
    left={
      <Back pageTransition="slideDown">
        <Symbol symbol="expand_more" className="text-3xl font-semibold" />
      </Back>
    }
  />
)
