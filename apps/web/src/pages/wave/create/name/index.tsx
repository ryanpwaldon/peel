import { z } from 'zod'
import { useRouter } from 'next/router'
import { useForm } from '@/hooks/useForm'
import Back from '@/components/Back/Back'
import { useLink } from '@/components/Link/Link'
import Page from '@/components/Scaffolding/Page'
import TitleMd from '@/components/Title/TitleMd'
import InputText from '@/components/Input/InputText'
import Header from '@/components/Scaffolding/Header'
import PageTransitionConsumer from '@/components/PageTransition/PageTransitionConsumer'
import { useEffect } from 'react'

export default function WaveCreateNamePage() {
  const link = useLink()
  const router = useRouter()
  const { register, handleSubmit, setFocus } = useForm(z.object({ name: z.string() }))

  useEffect(() => {
    setFocus('name')
  }, [setFocus])

  const onSubmit = handleSubmit(({ name }) => {
    link.push({ pathname: '/wave/create', query: { ...router.query, name }, pageTransition: 'slideBack' })
  })

  return (
    <PageTransitionConsumer>
      <Page showNavigation={false} header={<Header left={<Back />} right={<span></span>} />}>
        <form className="px-5" onSubmit={onSubmit}>
          <TitleMd title="Wave name" />
          <span className="text-gray-500">Lorem ipsum dolor sit amet consectetur. Massa consectetur neque a at viverra nisi arcu.</span>
          <InputText field={register('name')} className="mt-3" />
        </form>
      </Page>
    </PageTransitionConsumer>
  )
}
