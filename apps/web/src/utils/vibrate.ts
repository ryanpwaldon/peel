import { Haptics, ImpactStyle } from '@peel/native/src/haptics'

export const vibrate = () => Haptics.impact({ style: ImpactStyle.Light })
