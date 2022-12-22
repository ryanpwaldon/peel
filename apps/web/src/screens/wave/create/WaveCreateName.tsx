import { z } from 'zod'
import Page from '@/components/Page/Page'
import { useForm } from '@/hooks/useForm'
import TitleMd from '@/components/Title/TitleMd'
import { validateWaveName } from '@peel/validators'
import InputText from '@/components/Input/InputText'
import ButtonBack from '@/components/Button/ButtonBack'
import HeaderTitle from '@/components/Title/HeaderTitle'
import ButtonBaseText from '@/components/ButtonBase/ButtonBaseText'

const schema = z.object({ name: validateWaveName })

interface WaveCreateNameProps {
  onClose: () => void
  onDone: (values: z.infer<typeof schema>) => void
  initial: z.infer<typeof schema>
}

export default function WaveCreateName({ onClose, onDone, initial }: WaveCreateNameProps) {
  const { handleSubmit, register } = useForm(schema, { defaultValues: initial })
  const onSubmit = handleSubmit((values) => {
    onDone(values)
    onClose()
  })

  return (
    <Page
      headerFill
      showNavigation={false}
      headerLeft={<ButtonBack onClick={onClose} />}
      headerRight={<ButtonBaseText text="Done" onClick={onSubmit} />}
      headerCenter={<HeaderTitle title="Wave name" />}
    >
      <div className="mt-5 px-5">
        <TitleMd title="Wave name" />
        <span className="text-gray-500">Lorem ipsum dolor sit amet consectetur. Massa consectetur neque a at viverra nisi arcu.</span>
        <InputText field={register('name')} className="mt-3" />
      </div>
    </Page>
  )
}
