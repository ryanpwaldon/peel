import { z } from 'zod'
import Map from '@/components/Map/Map'
import Page from '@/components/Page/Page'
import { useForm } from '@/hooks/useForm'
import TitleMd from '@/components/Title/TitleMd'
import { validateAngulation } from '@peel/validators'
import ButtonBack from '@/components/Button/ButtonBack'
import HeaderTitle from '@/components/Title/HeaderTitle'
import ButtonBaseText from '@/components/ButtonBase/ButtonBaseText'
import InputAngulation from '@/components/Input/InputAngulation'

const schema = z.object({
  faceDirection: validateAngulation,
})

interface WaveCreateFaceDirectionProps {
  onClose: () => void
  onDone: (values: z.infer<typeof schema>) => void
  initial: z.infer<typeof schema>
  lng: number
  lat: number
}

export default function WaveCreateFaceDirection({ onClose, onDone, initial, lng, lat }: WaveCreateFaceDirectionProps) {
  const { handleSubmit, setValue, getValues, watch } = useForm(schema, { defaultValues: { faceDirection: initial.faceDirection ?? 0 } })
  const onSubmit = handleSubmit((values) => {
    onDone(values)
    onClose()
  })

  return (
    <Page
      headerFill
      showNavigation={false}
      headerLeft={<ButtonBack onClick={onClose} />}
      headerRight={<ButtonBaseText text="Done" onClick={onSubmit} />}
      headerCenter={<HeaderTitle title="Wave face direction" />}
      className="bg-white"
    >
      <div className="flex h-full flex-col">
        <div className="px-5 py-5">
          <TitleMd title="Wave location" />
          <span className="text-gray-500">Lorem ipsum dolor sit amet consectetur. Massa consectetur neque a at viverra nisi arcu.</span>
        </div>
        <div className="relative h-full w-full border-t-hairline border-gray-200">
          <div className="absolute top-0 left-0 z-10 flex h-full w-full items-center justify-center">
            <InputAngulation
              className="w-[calc(100%_-_120px)]"
              initial={getValues('faceDirection')}
              onChange={(value) => setValue('faceDirection', value, { shouldValidate: true })}
            />
          </div>
          <div className="absolute top-3 right-3 z-10 flex w-16 justify-center rounded-full border-hairline border-gray-200 bg-white py-1.5">
            {watch('faceDirection') + '°'}
          </div>
          <Map initialViewState={{ longitude: lng, latitude: lat, zoom: 10 }} interactive={false} className="h-full w-full" />
        </div>
      </div>
    </Page>
  )
}
