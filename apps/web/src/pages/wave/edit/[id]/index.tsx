import { useRef } from 'react'
import { trpc } from '@/utils/trpc'
import { useRouter } from 'next/router'
import Page from '@/components/Page/Page'
import Back from '@/components/Back/Back'
import PageTitle from '@/components/Title/PageTitle'
import ButtonBack from '@/components/Button/ButtonBack'
import PageLoader from '@/components/Templates/PageLoader'
import HeaderTitleSubtitle from '@/components/Title/HeaderTitleSubtitle'
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

const Content = () => {
  const router = useRouter()
  const waveId = useRef(router.query.id as string)
  const [wave] = trpc.wave.findById.useSuspenseQuery(waveId.current)

  return (
    <Page
      headerFill
      showNavigation={false}
      headerLeft={<Back content={(onClick) => <ButtonBack onClick={onClick} />} />}
      headerCenter={<HeaderTitleSubtitle title="Edit wave" subtitle={`${wave.name}`} />}
    >
      <div className="pb-content-bottom">
        <PageTitle title={wave.name} className="px-5" />
        <div className="px-5 text-base text-gray-500">{`${wave.point.location.region}, ${wave.point.location.country}`}</div>
      </div>
    </Page>
  )
}
