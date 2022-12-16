import { z } from 'zod'
import { useState } from 'react'
import Back from '@/components/Back/Back'
import { useForm } from '@/hooks/useForm'
import Symbol from '@/components/Symbol/Symbol'
import TitleMd from '@/components/Title/TitleMd'
import Page from '@/components/Scaffolding/Page'
import Header from '@/components/Scaffolding/Header'
import PageTitle from '@/components/Title/PageTitle'
import CreateWaveName from '@/screens/CreateWaveName'
import InputPromptText from '@/components/InputPrompt/InputPromptText'
import PageTransitionConsumer from '@/components/PageTransition/PageTransitionConsumer'

export default function WaveCreatePage() {
  const { register, handleSubmit, formState } = useForm(
    z.object({
      name: z.string(),
      faceDirection: z.number(),
      rideDirection: z.enum(['LEFT', 'RIGHT', 'BOTH']),
      lng: z.number(),
      lat: z.number(),
    }),
  )

  const onSubmit = handleSubmit(async ({ name, lng, lat, faceDirection, rideDirection }) => {
    console.log(name, lng, lat, faceDirection, rideDirection)
  })

  const [open, setOpen] = useState(false)

  return (
    <PageTransitionConsumer>
      <Page header={<WaveCreateHeader />} showNavigation={false}>
        <div className="px-5">
          <PageTitle title="Create a wave" />
          <TitleMd title="Enter details" className="mt-5" />
          <button onClick={() => setOpen(!open)}>Open</button>
          {open && <CreateWaveName field={register('name')} onClose={() => setOpen(!open)} />}
        </div>
      </Page>
    </PageTransitionConsumer>
  )
}

const WaveCreateHeader = () => (
  <Header
    left={
      <Back pageTransition="slideDown">
        <Symbol symbol="expand_more" className="text-3xl font-semibold" />
      </Back>
    }
  />
)
