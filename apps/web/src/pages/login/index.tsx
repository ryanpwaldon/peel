import { z } from 'zod'
import { useRouter } from 'next/router'
import { signIn } from 'next-auth/react'
import { useForm } from '@/hooks/useForm'
import Button from '@/components/Button/Button'
import Page from '@/components/Scaffolding/Page'
import InputText from '@/components/Input/InputText'

export default function LoginPage() {
  const router = useRouter()
  const { register, handleSubmit, formState } = useForm(z.object({ email: z.string().email() }))

  const onSubmit = handleSubmit(async ({ email }) => {
    const signInResponse = await signIn('email', { email, callbackUrl: '/', redirect: false })
    if (signInResponse?.error) alert(signInResponse.error)
    else await router.push({ pathname: '/verify', query: { email } })
  })

  return (
    <Page showNavigation={false}>
      <div className="flex h-full w-full flex-col px-5 pt-device-bar-top pb-content-bottom">
        <div className="h-full w-full pt-16">
          <h1 className="text-4xl font-bold">Peel</h1>
          <p className="mt-3 text-base">Lorem ipsum dolor sit amet consectetur. Nisi viverra at tellus malesuada.</p>
        </div>
        <form className="grid gap-3" onSubmit={onSubmit}>
          <InputText label="Email" field={register('email')} />
          <Button theme="white" loading={formState.isSubmitting} text="Log in" type="submit" />
          <p className="text-center text-xs text-gray-500">By logging in you accept our terms of use and privacy policy.</p>
        </form>
      </div>
    </Page>
  )
}
