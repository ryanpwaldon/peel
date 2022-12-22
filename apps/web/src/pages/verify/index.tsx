import { z } from 'zod'
import { useRouter } from 'next/router'
import Page from '@/components/Page/Page'
import { useForm } from '@/hooks/useForm'
import InputText from '@/components/Input/InputText'
import ButtonBaseRect from '@/components/ButtonBase/ButtonBaseRect'
import PageTransitionConsumer from '@/components/Page/PageTransitionConsumer'

export default function LoginPage() {
  const router = useRouter()
  const email = router.query.email as string
  const { register, handleSubmit, formState } = useForm(z.object({ token: z.string() }))

  const onSubmit = handleSubmit(async ({ token }) => {
    await router.push({
      pathname: '/api/auth/callback/email',
      query: { token, email, callbackUrl: '/' },
    })
  })

  return (
    <PageTransitionConsumer>
      <Page showNavigation={false}>
        <div className="flex h-full w-full flex-col px-5 pt-device-bar-top pb-content-bottom">
          <div className="h-full w-full pt-16">
            <h1 className="text-4xl font-bold">Enter your code</h1>
            <p className="mt-3 text-base">Verify your email by entering the code we sent to your inbox</p>
          </div>
          <form className="grid gap-3" onSubmit={onSubmit}>
            <InputText label="Code" field={register('token')} />
            <ButtonBaseRect theme="blackOnWhite" loading={formState.isSubmitting} text="Continue" type="submit" className="!h-12" />
          </form>
        </div>
      </Page>
    </PageTransitionConsumer>
  )
}
