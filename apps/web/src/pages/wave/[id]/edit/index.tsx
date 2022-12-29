import { useRef } from 'react'
import { trpc } from '@/utils/trpc'
import { useRouter } from 'next/router'
import Page from '@/components/Page/Page'
import Back from '@/components/Back/Back'
import ButtonBack from '@/components/Button/ButtonBack'
import HeaderTitle from '@/components/Title/HeaderTitle'
import PageLoader from '@/components/Templates/PageLoader'
import ListButtonGroup from '@/components/ListButton/ListButtonGroup'
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
      headerCenter={<HeaderTitle title="Edit wave" />}
    >
      <div className="px-5 pb-content-bottom pt-8">
        <ListButtonGroup
          items={[
            { label: 'Name', value: wave.name, url: { pathname: '/wave/[id]/edit/name', query: { id: wave.id } } },
            { label: 'Location', url: { pathname: '/wave/[id]/edit/name', query: { id: wave.id } } },
            { label: 'Ride direction', value: wave.rideDirection, url: { pathname: '/wave/[id]/edit/name', query: { id: wave.id } } },
            { label: 'Face direction', value: wave.faceDirection.toString(), url: { pathname: '/wave/[id]/edit/name', query: { id: wave.id } } },
          ]}
        />
      </div>
    </Page>
  )
}
