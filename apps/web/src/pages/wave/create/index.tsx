import Back from '@/components/Back/Back'
import Page from '@/components/Page/Page'
import TitleMd from '@/components/Title/TitleMd'
import { Screen } from '@/components/Screen/Screen'
import PageTitle from '@/components/Title/PageTitle'
import ButtonChevronDown from '@/components/Button/ButtonChevronDown'
import WaveCreateLngLat from '@/screens/wave/create/WaveCreateLngLat'
import InputPromptText from '@/components/InputPrompt/InputPromptText'
import PageTransitionConsumer from '@/components/Page/PageTransitionConsumer'

export default function WaveCreatePage() {
  return (
    <PageTransitionConsumer>
      <Page headerLeft={<Back pageTransition="slideDown" content={(onClick) => <ButtonChevronDown onClick={onClick} />} />} showNavigation={false}>
        <div className="px-5">
          <PageTitle title="Create a wave" />
          <TitleMd title="Enter details" className="mt-5" />
          <Screen
            trigger={(open) => <InputPromptText title="Name" placeholder="Enter a name" onClick={open} className="mt-3" />}
            content={(close) => <WaveCreateLngLat onClose={close} />}
          />
        </div>
      </Page>
    </PageTransitionConsumer>
  )
}
