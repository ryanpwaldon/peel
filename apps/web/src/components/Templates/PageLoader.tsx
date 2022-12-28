import { Suspense } from 'react'
import Page from '@/components/Page/Page'
import Back from '@/components/Back/Back'
import Spinner from '@/components/Spinner/Spinner'
import ButtonBack from '@/components/Button/ButtonBack'

interface PageLoaderProps {
  children: React.ReactNode
}

export default function PageLoader({ children }: PageLoaderProps) {
  return (
    <Suspense
      fallback={
        <Page headerLeft={<Back content={(onClick) => <ButtonBack onClick={onClick} />} />}>
          <div className="flex h-full w-full items-center justify-center">
            <Spinner />
          </div>
        </Page>
      }
    >
      {children}
    </Suspense>
  )
}
