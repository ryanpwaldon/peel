import { z } from 'zod'
import Map from '@/components/Map/Map'
import Page from '@/components/Page/Page'
import { useForm } from '@/hooks/useForm'
import TitleMd from '@/components/Title/TitleMd'
import ButtonBack from '@/components/Button/ButtonBack'
import HeaderTitle from '@/components/Title/HeaderTitle'
import { validateLat, validateLng } from '@peel/validators'
import ButtonBaseText from '@/components/ButtonBase/ButtonBaseText'

interface WaveCreateLngLatProps {
  // defaultValues: z.infer<typeof schema>
  // onDone: (values: z.infer<typeof schema>) => void
  onClose: () => void
}

export default function WaveCreateLngLat({ onClose }: WaveCreateLngLatProps) {
  const { handleSubmit, setValue } = useForm(
    z.object({
      lng: validateLng,
      lat: validateLat,
    }),
  )

  const onSubmit = handleSubmit((values) => console.log(values))

  return (
    <Page
      headerFill
      showNavigation={false}
      headerLeft={<ButtonBack onClick={onClose} />}
      headerRight={<ButtonBaseText text="Done" onClick={onSubmit} />}
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
