import { z } from 'zod'
import { signIn } from 'next-auth/react'
import Page from '@/components/Page/Page'
import { useForm } from '@/hooks/useForm'
import { useLink } from '@/components/Link/Link'
import InputText from '@/components/Input/InputText'
import ButtonRect from '@/components/Button/ButtonRect'
import PageTransitionConsumer from '@/components/Page/PageTransitionConsumer'

export default function LoginPage() {
  const link = useLink()
  const { register, handleSubmit, formState } = useForm(z.object({ email: z.string().email() }))

  const onSubmit = handleSubmit(async ({ email }) => {
    const signInResponse = await signIn('email', { email, callbackUrl: '/', redirect: false })
    if (signInResponse?.error) alert(signInResponse.error)
    else await link.push({ pathname: '/verify', query: { email }, pageTransition: 'slideForward' })
  })

  return (
    <PageTransitionConsumer>
      <Page showNavigation={false}>
        <div className="flex h-full w-full flex-col px-5 pt-device-bar-top pb-content-bottom">
          <div className="h-full w-full pt-16">
            <h1 className="text-4xl font-bold">Peel</h1>
            <p className="mt-3 text-base">Lorem ipsum dolor sit amet consectetur. Nisi viverra at tellus malesuada.</p>
          </div>
          <form className="grid gap-3" onSubmit={onSubmit}>
            <InputText label="Email" field={register('email')} />
            <ButtonRect theme="blackOnWhite" loading={formState.isSubmitting} text="Log in" type="submit" className="!h-12" />
            <p className="text-center text-xs text-gray-500">By logging in you accept our terms of use and privacy policy.</p>
          </form>
        </div>
      </Page>
    </PageTransitionConsumer>
  )
}
