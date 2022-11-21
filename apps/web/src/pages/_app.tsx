import '@/assets/css/main.css'
import { trpc } from '@/utils/trpc'
import { type AppType } from 'next/app'
import { type Session } from 'next-auth'
import localFont from '@next/font/local'
import { SessionProvider } from 'next-auth/react'
import AuthGuard from '@/components/Misc/AuthGuard'
import DeepLink from '@/components/Misc/DeepLink'

const interFont = localFont({
  weight: '100 900',
  style: 'normal',
  variable: '--inter-font',
  src: '../assets/font/inter.woff2',
})

const symbolsFont = localFont({
  weight: '100 700',
  style: 'normal',
  variable: '--symbols-font',
  src: '../assets/font/symbols.woff2',
  display: 'block',
})

const MyApp: AppType<{ session: Session | null }> = ({ Component, pageProps: { session, ...pageProps } }) => {
  return (
    <SessionProvider session={session}>
      <div id="app" className={`${interFont.variable} ${symbolsFont.variable}`}>
        <DeepLink />
        <AuthGuard>
          <Component {...pageProps} />
        </AuthGuard>
      </div>
    </SessionProvider>
  )
}

export default trpc.withTRPC(MyApp)
