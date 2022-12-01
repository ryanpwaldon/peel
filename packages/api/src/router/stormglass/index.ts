import { router } from '../../trpc'
import { tideRouter } from './tide'
import { solarRouter } from './solar'
import { weatherRouter } from './weather'
import { seaLevelRouter } from './seaLevel'

export const stormglassRouter = router({
  tide: tideRouter,
  solar: solarRouter,
  weather: weatherRouter,
  seaLevel: seaLevelRouter,
})
