import '@/assets/css/main.css'
import { trpc } from '@/utils/trpc'
import { type AppType } from 'next/app'
import { type Session } from 'next-auth'
import localFont from '@next/font/local'
import { AnimatePresence } from 'framer-motion'
import { SessionProvider } from 'next-auth/react'
import DeepLink from '@/components/Misc/DeepLink'
import AuthGuard from '@/components/Misc/AuthGuard'
import PreviousRouteProvider from '@/components/PreviousRoute/PreviousRouteProvider'
import PageTransitionProvider from '@/components/PageTransition/PageTransitionProvider'

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

const MyApp: AppType<{ session: Session | null }> = ({ Component, pageProps: { session, ...pageProps }, router }) => {
  return (
    <SessionProvider session={session}>
      <PreviousRouteProvider>
        <div id="app" className={`${interFont.variable} ${symbolsFont.variable}`}>
          <div id="content">
            <DeepLink />
            <AuthGuard>
              <PageTransitionProvider>
                <AnimatePresence initial={false}>
                  <Component {...pageProps} key={router.asPath} />
                </AnimatePresence>
              </PageTransitionProvider>
            </AuthGuard>
          </div>
        </div>
      </PreviousRouteProvider>
    </SessionProvider>
  )
}

export default trpc.withTRPC(MyApp)
