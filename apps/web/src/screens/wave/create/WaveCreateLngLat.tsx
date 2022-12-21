import { z } from 'zod'
import Map from '@/components/Map/Map'
import Page from '@/components/Page/Page'
import { useForm } from '@/hooks/useForm'
import TitleMd from '@/components/Title/TitleMd'
import ButtonText from '@/components/Button/ButtonText'
import PageTransitionConsumer from '@/components/Page/PageTransitionConsumer'

const schema = z.object({
  lng: z.number().min(-180).max(180),
  lat: z.number().min(-90).max(90),
})

interface WaveCreateNameProps {
  defaultValues: z.infer<typeof schema>
  onDone: (values: z.infer<typeof schema>) => void
}

export default function WaveCreateName({ onDone, defaultValues }: WaveCreateNameProps) {
  const { register, handleSubmit, formState } = useForm(schema)
  const onSubmit = handleSubmit(onDone)

  return (
    <PageTransitionConsumer>
      <Page showNavigation={false} headerLeft={<ButtonText text="Back" />} headerRight={<ButtonText text="Done" />}>
        <div className="flex h-full flex-col">
          <div className="px-5 py-5">
            <TitleMd title="Wave location" />
            <span className="text-gray-500">Lorem ipsum dolor sit amet consectetur. Massa consectetur neque a at viverra nisi arcu.</span>
          </div>
          <Map
            initialViewState={{
              longitude: -122.4,
              latitude: 37.8,
              zoom: 14,
            }}
            className="border-t-hairline border-gray-200"
          />
        </div>
      </Page>
    </PageTransitionConsumer>
  )
}
