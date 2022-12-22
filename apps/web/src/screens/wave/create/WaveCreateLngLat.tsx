import { z } from 'zod'
import Map from '@/components/Map/Map'
import Page from '@/components/Page/Page'
import { useForm } from '@/hooks/useForm'
import TitleMd from '@/components/Title/TitleMd'
import ButtonBack from '@/components/Button/ButtonBack'
import ButtonText from '@/components/Button/ButtonText'
import HeaderTitle from '@/components/Title/HeaderTitle'

const schema = z.object({
  lng: z
    .number()
    .min(-180)
    .max(180)
    .transform((val) => val.toFixed(6))
    .transform((val) => parseFloat(val)),
  lat: z
    .number()
    .min(-90)
    .max(90)
    .transform((val) => val.toFixed(6))
    .transform((val) => parseFloat(val)),
})

interface WaveCreateLngLatProps {
  // defaultValues: z.infer<typeof schema>
  // onDone: (values: z.infer<typeof schema>) => void
  onClose: () => void
}

export default function WaveCreateLngLat({ onClose }: WaveCreateLngLatProps) {
  const { handleSubmit, setValue } = useForm(schema)
  const onSubmit = handleSubmit((values) => console.log(values))

  return (
    <Page
      headerFill
      showNavigation={false}
      headerLeft={<ButtonBack onClick={onClose} />}
      headerRight={<ButtonText text="Done" onClick={onSubmit} />}
      headerCenter={<HeaderTitle title="Wave location" />}
      className="bg-white"
    >
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
          onMove={(event) => {
            setValue('lng', event.viewState.longitude, { shouldValidate: true })
            setValue('lat', event.viewState.latitude, { shouldValidate: true })
          }}
          className="border-t-hairline border-gray-200"
        />
      </div>
    </Page>
  )
}
