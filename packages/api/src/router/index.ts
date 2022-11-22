import { router } from '@/trpc'
import { authRouter } from '@/router/auth'
import { waveRouter } from '@/router/wave'

export const appRouter = router({
  auth: authRouter,
  wave: waveRouter,
})

// export type definition of API
export type AppRouter = typeof appRouter
