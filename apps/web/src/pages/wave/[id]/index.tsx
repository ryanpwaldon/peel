import { useRef } from 'react'
import { trpc } from '@/utils/trpc'
import { useRouter } from 'next/router'
import Page from '@/components/Page/Page'
import Back from '@/components/Back/Back'
import Symbol from '@/components/Symbol/Symbol'
import PageTitle from '@/components/Title/PageTitle'
import Forecast from '@/components/Forecast/Forecast'
import ButtonBack from '@/components/Button/ButtonBack'
import PageLoader from '@/components/Templates/PageLoader'
import SheetOptions from '@/components/Sheet/SheetOptions'
import ButtonBaseRect from '@/components/ButtonBase/ButtonBaseRect'
import PageTransitionConsumer from '@/components/Page/PageTransitionConsumer'

export default function Wave() {
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

  const WaveSheet = () => {
    return (
      <SheetOptions
        trigger={<Symbol symbol="more_horiz" className="text-2xl font-extrabold text-blue-600" />}
        options={[
          {
            label: 'Edit',
            symbol: 'edit',
            pageTransition: 'slideForward',
            url: { pathname: '/wave/[id]/edit', query: { id: waveId.current } },
          },
        ]}
      />
    )
  }

  return (
    <Page headerLeft={<Back content={(onClick) => <ButtonBack onClick={onClick} />} />} headerRight={<WaveSheet />}>
      <div className="pb-content-bottom">
        <PageTitle title={wave.name} className="px-5" />
        <div className="px-5 text-base text-gray-500">{`${wave.point.location.region}, ${wave.point.location.country}`}</div>
        <div className="mt-4 flex space-x-3 px-5">
          <ButtonBaseRect theme="blackOnWhite" className="w-full flex-1">
            <Symbol symbol="play_arrow" className="text-2xl" />
            <span>Start session</span>
          </ButtonBaseRect>
          <ButtonBaseRect theme="blackOnWhite" className="h-11 w-11">
            <Symbol symbol="star" className="text-2xl" />
          </ButtonBaseRect>
        </div>
        <Forecast wave={wave} />
      </div>
    </Page>
  )
}
