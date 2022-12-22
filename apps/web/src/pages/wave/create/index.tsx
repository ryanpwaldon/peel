import { z } from 'zod'
import Back from '@/components/Back/Back'
import Page from '@/components/Page/Page'
import { useForm } from '@/hooks/useForm'
import TitleMd from '@/components/Title/TitleMd'
import { Screen } from '@/components/Screen/Screen'
import PageTitle from '@/components/Title/PageTitle'
import WaveCreateName from '@/screens/wave/create/WaveCreateName'
import ButtonChevronDown from '@/components/Button/ButtonChevronDown'
import WaveCreateLngLat from '@/screens/wave/create/WaveCreateLngLat'
import InputPromptText from '@/components/InputPrompt/InputPromptText'
import PageTransitionConsumer from '@/components/Page/PageTransitionConsumer'
import { validateAngulation, validateLat, validateLng, validateWaveName, validateWaveRideDirection } from '@peel/validators'

export default function WaveCreatePage() {
  const { handleSubmit, getValues, setValue } = useForm(
    z.object({
      name: validateWaveName,
      faceDirection: validateAngulation,
      rideDirection: validateWaveRideDirection,
      lng: validateLng,
      lat: validateLat,
    }),
  )

  const onSubmit = handleSubmit((values) => console.log(values))

  return (
    <PageTransitionConsumer>
      <Page headerLeft={<Back pageTransition="slideDown" content={(onClick) => <ButtonChevronDown onClick={onClick} />} />} showNavigation={false}>
        <form className="px-5" onSubmit={onSubmit}>
          <PageTitle title="Create a wave" />
          <TitleMd title="Enter details" className="mt-5" />
          <Screen
            trigger={(open) => <InputPromptText title="Name" placeholder={getValues('name') ?? 'Enter a name'} onClick={open} className="mt-3" />}
            content={(close) => <WaveCreateName onClose={close} onDone={(values) => setValue('name', values.name)} initial={{ name: getValues('name') }} />}
          />
          <Screen
            trigger={(open) => (
              <InputPromptText
                title="Location"
                onClick={open}
                placeholder={getValues('lng') && getValues('lat') ? `${getValues('lng')}, ${getValues('lat')}` : 'Enter coordinates'}
                className="mt-3"
              />
            )}
            content={(close) => (
              <WaveCreateLngLat
                onClose={close}
                onDone={(values) => {
                  setValue('lng', values.lng)
                  setValue('lat', values.lat)
                }}
                initial={{ lng: getValues('lng'), lat: getValues('lat') }}
              />
            )}
          />
        </form>
      </Page>
    </PageTransitionConsumer>
  )
}
