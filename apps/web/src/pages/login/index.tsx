import { useState } from 'react'
import { signIn } from 'next-auth/react'
import Button from '@/components/Button/Button'
import Page from '@/components/Scaffolding/Page'

export default function LoginPage() {
  const [loading, setLoading] = useState(false)
  const onSignIn = async () => {
    setLoading(true)
    signIn('email', { email: 'ryanpwaldon@gmail.com', callbackUrl: '/', redirect: false })
  }

  return (
    <Page showNavigation={false}>
      <div className="pt-device-bar-top pb-content-bottom px-5 w-full h-full flex flex-col">
        <div className="w-full h-full pt-16">
          <h1 className="text-4xl font-bold">Peel</h1>
          <p className="text-base mt-3">Lorem ipsum dolor sit amet consectetur. Nisi viverra at tellus malesuada.</p>
        </div>
        <div className="grid gap-3">
          <Button theme="white" onClick={onSignIn} loading={loading} text="Log in" />
          <p className="text-gray-500 text-xs text-center">By logging in you accept our terms of use and privacy policy.</p>
        </div>
      </div>
    </Page>
  )
}
