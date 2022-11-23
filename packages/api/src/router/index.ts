import { router } from '../trpc'
import { authRouter } from './auth'
import { userRouter } from './user'
import { waveRouter } from './wave'
import { locationRouter } from './location'

export const appRouter = router({
  auth: authRouter,
  user: userRouter,
  wave: waveRouter,
  location: locationRouter,
})

// export type definition of API
export type AppRouter = typeof appRouter
