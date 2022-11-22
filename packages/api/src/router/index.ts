import { router } from '@/trpc'
import { authRouter } from '@/router/auth'
import { waveRouter } from '@/router/wave'
import { geocodeRouter } from '@/router/geocode'

export const appRouter = router({
  auth: authRouter,
  wave: waveRouter,
  geocode: geocodeRouter,
})

// export type definition of API
export type AppRouter = typeof appRouter
