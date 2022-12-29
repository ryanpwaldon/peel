import { z } from 'zod'
import { useRef } from 'react'
import { trpc } from '@/utils/trpc'
import { useRouter } from 'next/router'
import { useForm } from '@/hooks/useForm'
import TitleMd from '@/components/Title/TitleMd'
import { useBack } from '@/components/Back/Back'
import { validateWaveName } from '@peel/validators'
import InputText from '@/components/Input/InputText'
import PageInput from '@/components/Templates/PageInput'
import PageLoader from '@/components/Templates/PageLoader'
import PageTransitionConsumer from '@/components/Page/PageTransitionConsumer'

export default function WaveEditPage() {
  return (
    <PageTransitionConsumer>
      <PageLoader>
        <Content />
      </PageLoader>
    </PageTransitionConsumer>
  )
}

const schema = z.object({ name: validateWaveName })

const Content = () => {
  const back = useBack()
  const router = useRouter()
  const waveId = useRef(router.query.id as string)
  const [wave] = trpc.wave.findById.useSuspenseQuery(waveId.current)
  const updateWave = trpc.wave.update.useMutation()

  const { handleSubmit, register } = useForm(schema, { defaultValues: { name: wave.name } })

  const onSubmit = handleSubmit(async (values) => {
    await updateWave.mutateAsync({ id: waveId.current, name: values.name })
    back.go()
  })

  return (
    <form className="contents" onSubmit={onSubmit}>
      <PageInput title="Edit name">
        <div className="mt-5 px-5">
          <TitleMd title="Wave name" />
          <span className="text-gray-500">Lorem ipsum dolor sit amet consectetur. Massa consectetur neque a at viverra nisi arcu.</span>
          <InputText field={register('name')} className="mt-3" />
        </div>
      </PageInput>
    </form>
  )
}
