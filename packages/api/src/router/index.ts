import { router } from '../trpc'
import { authRouter } from './auth'
import { waveRouter } from './wave'
import { geocodeRouter } from './geocode'

export const appRouter = router({
  auth: authRouter,
  wave: waveRouter,
  geocode: geocodeRouter,
})

// export type definition of API
export type AppRouter = typeof appRouter
