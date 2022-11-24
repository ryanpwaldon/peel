import { tideRouter } from './tide'
import { router } from '../../trpc'
import { solarRouter } from './solar'
import { weatherRouter } from './weather'

export const stormglassRouter = router({
  solar: solarRouter,
  tide: tideRouter,
  weather: weatherRouter,
})
