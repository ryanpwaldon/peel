import Back from '@/components/Back/Back'
import Page from '@/components/Page/Page'
import Header from '@/components/Header/Header'
import TitleMd from '@/components/Title/TitleMd'
import InputText from '@/components/Input/InputText'
import { UseFormRegisterReturn } from 'react-hook-form'
import PageTransitionConsumer from '@/components/Page/PageTransitionConsumer'

interface CreateWaveNameProps {
  field: UseFormRegisterReturn
  onClose: () => void
}

export default function CreateWaveName({ field }: CreateWaveNameProps) {
  return (
    <PageTransitionConsumer>
      <Page showNavigation={false} header={<Header left={<Back />} right={<span></span>} />}>
        <div className="px-5">
          <TitleMd title="Wave name" />
          <span className="text-gray-500">Lorem ipsum dolor sit amet consectetur. Massa consectetur neque a at viverra nisi arcu.</span>
          <InputText field={field} className="mt-3" />
        </div>
      </Page>
    </PageTransitionConsumer>
  )
}
