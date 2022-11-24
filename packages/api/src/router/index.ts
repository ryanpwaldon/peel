import { router } from '../trpc'
import { authRouter } from './auth'
import { userRouter } from './user'
import { waveRouter } from './wave'
import { locationRouter } from './location'
import { stormglassRouter } from './stormglass'

export const appRouter = router({
  auth: authRouter,
  user: userRouter,
  wave: waveRouter,
  location: locationRouter,
  stormglass: stormglassRouter,
})

// export type definition of API
export type AppRouter = typeof appRouter
